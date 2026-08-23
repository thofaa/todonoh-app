#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::net::{TcpListener, TcpStream};
use std::time::Duration;
use tauri::Manager;
use tauri_plugin_shell::ShellExt;

fn free_port() -> u16 {
    TcpListener::bind("127.0.0.1:0")
        .expect("failed to bind ephemeral port")
        .local_addr()
        .expect("no local addr")
        .port()
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let port = free_port();
            let public_dir = std::path::absolute("../public").expect("public dir");
            let sidecar = app.shell().sidecar("frankenphp")?;
            let (_rx, child) = sidecar
                .args([
                    "php-server",
                    "--root",
                    public_dir.to_str().expect("utf8 path"),
                    "--listen",
                    &format!("127.0.0.1:{port}"),
                ])
                .env("APP_ENV", "production")
                .spawn()
                .map_err(|e| {
                    eprintln!("sidecar spawn failed: {e}");
                    e
                })?;
            // keep the handle so the process dies with the app
            app.manage(child);

            let handle = app.handle().clone();
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
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
