#!/usr/bin/env bash
# Installs the built AppImage as a first-class desktop app for the current user:
# stable binary path + hicolor icons + menu entry ("TODONOH").
set -euo pipefail
cd "$(dirname "$0")/.."

APP=src-tauri/target/release/bundle/appimage/TODONOH_0.1.0_amd64.AppImage
[ -f "$APP" ] || { echo "AppImage not found - run 'npm run tauri:build' first"; exit 1; }

mkdir -p ~/.local/bin
install -m 755 "$APP" ~/.local/bin/todonoh.AppImage

for size in 32x32 128x128 256x256; do
    case $size in
        256x256) src=src-tauri/icons/128x128@2x.png ;;
        *)       src=src-tauri/icons/$size.png ;;
    esac
    install -D -m 644 "$src" ~/.local/share/icons/hicolor/$size/apps/todonoh.png
done

mkdir -p ~/.local/share/applications
cat > ~/.local/share/applications/TODONOH.desktop <<EOF
[Desktop Entry]
Type=Application
Name=TODONOH
Exec=$HOME/.local/bin/todonoh.AppImage
Icon=todonoh
Terminal=false
Categories=Office;
StartupWMClass=todonoh
Comment=Personal todo app
EOF

update-desktop-database ~/.local/share/applications 2>/dev/null || true
gtk-update-icon-cache -f -t ~/.local/share/icons/hicolor 2>/dev/null || true
echo "Installed: 'TODONOH' is now in your app menu (~/.local/bin/todonoh.AppImage)"
