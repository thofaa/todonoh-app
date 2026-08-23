#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::net::{TcpListener, TcpStream};
use std::path::{Path, PathBuf};
use std::process::{Child, Command, Stdio};
use std::sync::{Arc, Mutex};
use std::time::Duration;
use tauri::{Manager, RunEvent};

fn free_port() -> u16 {
    TcpListener::bind("127.0.0.1:0")
        .expect("failed to bind ephemeral port")
        .local_addr()
        .expect("no local addr")
        .port()
}

fn laravel_root(handle: &tauri::AppHandle) -> PathBuf {
    if cfg!(debug_assertions) {
        std::env::current_dir().expect("cwd").join("..")
    } else {
        handle
            .path()
            .resource_dir()
            .expect("resource dir")
            .join("resources/laravel")
    }
}

fn frankenphp_path(handle: &tauri::AppHandle) -> PathBuf {
    if cfg!(debug_assertions) {
        let dir = std::env::current_dir().expect("cwd").join("binaries");
        std::fs::read_dir(&dir)
            .expect("binaries dir")
            .filter_map(|e| e.ok())
            .map(|e| e.path())
            .find(|p| {
                p.file_name()
                    .and_then(|n| n.to_str())
                    .is_some_and(|n| n.starts_with("frankenphp-"))
            })
            .unwrap_or_else(|| panic!("frankenphp sidecar not found in {}", dir.display()))
    } else {
        handle
            .path()
            .resource_dir()
            .expect("resource dir")
            .join("resources/bin/frankenphp")
    }
}

fn ensure_executable(p: &Path) {
    use std::os::unix::fs::PermissionsExt;
    if let Ok(meta) = std::fs::metadata(p) {
        let mut perm = meta.permissions();
        if perm.mode() & 0o111 != 0o111 {
            perm.set_mode(0o755);
            std::fs::set_permissions(p, perm).ok();
        }
    }
}

fn app_key(data_dir: &Path) -> String {
    let key_file = data_dir.join("app.key");
    if let Ok(key) = std::fs::read_to_string(&key_file) {
        let trimmed = key.trim();
        if !trimmed.is_empty() {
            return trimmed.to_string();
        }
    }
    use std::io::Read;
    let mut seed = [0u8; 16];
    std::fs::File::open("/dev/urandom")
        .expect("open /dev/urandom")
        .read_exact(&mut seed)
        .expect("read entropy");
    let key: String = seed.iter().map(|b| format!("{b:02x}")).collect();
    std::fs::write(&key_file, &key).expect("persist app key");
    key
}

fn prepare_state(data_dir: &Path) {
    let dirs = [
        "database",
        "storage/app/private",
        "storage/app/public",
        "storage/framework/cache/data",
        "storage/framework/views",
        "storage/logs",
    ];
    for rel in dirs {
        std::fs::create_dir_all(data_dir.join(rel)).expect("create state dir");
    }
    let db = data_dir.join("database/todo.sqlite");
    if !db.exists() {
        std::fs::write(&db, b"").expect("create sqlite file");
    }
}

fn migrate(fp: &Path, laravel_root: &Path, data_dir: &Path) {
    if cfg!(debug_assertions) || data_dir.join(".migrated").exists() {
        return;
    }
    let output = Command::new(fp)
        .args(["php-cli", "artisan", "migrate", "--force"])
        .current_dir(laravel_root)
        .output()
        .expect("spawn migrate");
    if output.status.success() {
        std::fs::write(data_dir.join(".migrated"), b"ok").ok();
    } else {
        eprintln!(
            "migrate failed:\n{}{}",
            String::from_utf8_lossy(&output.stdout),
            String::from_utf8_lossy(&output.stderr)
        );
    }
}

type ServerChild = Arc<Mutex<Option<Child>>>;

fn main() {
    let server: ServerChild = Arc::new(Mutex::new(None));
    let server_for_setup = server.clone();
    tauri::Builder::default()
        .setup(move |app| {
            let handle = app.handle().clone();
            let port = free_port();
            let laravel = laravel_root(&handle);
            let fp = frankenphp_path(&handle);
            for required in [laravel.join("public/index.php"), fp.clone()] {
                if !required.exists() {
                    panic!("packaged file missing: {}", required.display());
                }
            }
            ensure_executable(&fp);
            let data_dir = handle.path().app_data_dir().expect("app data dir");
            prepare_state(&data_dir);

            let mut cmd = Command::new(&fp);
            cmd.args([
                "php-server",
                "--root",
                laravel.join("public").to_str().expect("utf8 path"),
                "--listen",
                &format!("127.0.0.1:{port}"),
            ])
            .env("APP_ENV", "production")
            .env("APP_DEBUG", "false");

            if !cfg!(debug_assertions) {
                cmd.env("APP_KEY", app_key(&data_dir))
                    .env("DB_CONNECTION", "sqlite")
                    .env(
                        "DB_DATABASE",
                        data_dir.join("database/todo.sqlite").to_str().expect("utf8"),
                    )
                    .env("SESSION_DRIVER", "database")
                    .env("CACHE_STORE", "file")
                    .env(
                        "APP_STORAGE_PATH",
                        data_dir.join("storage").to_str().expect("utf8"),
                    )
                    .env("APP_URL", &format!("http://127.0.0.1:{port}"));
            }

            let child = Some(
                cmd.stdout(Stdio::null())
                    .stderr(Stdio::null())
                    .spawn()
                    .map_err(|e| {
                        eprintln!("frankenphp spawn failed: {e}");
                        e
                    })?,
            );
            *server_for_setup.lock().expect("server lock") = child;

            migrate(&fp, &laravel, &data_dir);

            std::thread::spawn(move || {
                for _ in 0..60 {
                    if TcpStream::connect(("127.0.0.1", port)).is_ok() {
                        if let Some(w) = handle.get_webview_window("main") {
                            let url = format!("http://127.0.0.1:{port}");
                            let _ = w.eval(&format!("window.location.replace('{url}')"));
                        }
                        return;
                    }
                    std::thread::sleep(Duration::from_millis(500));
                }
            });
            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while building tauri application")
        .run(move |_, event| {
            if let RunEvent::Exit = event {
                if let Some(mut child) = server.lock().expect("server lock").take() {
                    let _ = child.kill();
                }
            }
        });
}
