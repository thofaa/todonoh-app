<p align="center">
  <img src="public/favicon.svg" alt="Todonoh" width="128" />
</p>

<h1 align="center">TODONOH &#x1F639;</h1>

<p align="center">
  A simple desktop todo app built with Laravel, Inertia.js, and Tauri.
  <br />
  (This project actually I use to learn laravel, but I migrate it to desktop app and use Tauri to make the app without shipping it to my browser and without changing the laravel code, hehe)
</p>

## Build

### Prerequisites

- [PHP 8.5+](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [Node.js 22+](https://nodejs.org/)
- [Rust](https://www.rust-lang.org/tools/install)
- [Tauri Prerequisites](https://v2.tauri.app/start/prerequisites/)

### Clone

```bash
git clone https://github.com/your-username/todonoh.git
cd todonoh
```

### Setup

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
```

### Build the App

```bash
npm run tauri:build
```

Output: `src-tauri/target/release/bundle/appimage/TODONOH_0.1.0_amd64.AppImage`

## Tech Stack

- **Backend:** Laravel + PHP
- **Frontend:** React + Inertia.js + Tailwind CSS
- **Desktop:** Tauri v2

## Platform Support

| Platform | Status |
|----------|--------|
| Linux (x86_64) | Supported — `.deb` and `.AppImage` |
| Windows | Not yet — needs Windows frankenphp binary + `.msi`/`.nsis` bundle targets |
| macOS | Not yet — needs macOS frankenphp binary + `.dmg` bundle target |

To add Windows/macOS support, update `src-tauri/tauri.conf.json` bundle targets and provide the matching [FrankenPHP](https://github.com/dunglas/frankenphp) sidecar binary for each platform.
