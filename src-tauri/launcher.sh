#!/bin/sh
# Launcher for the FrankenPHP sidecar. The real binary ships as frankenphp.gz
# because AppImage bundling (linuxdeploy/patchelf) corrupts static-pie ELFs.
# Extracts once into the app data dir, then execs. Re-extracts when the .gz is newer.
set -e
DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
CACHE="${XDG_DATA_HOME:-$HOME/.local/share}/com.makoo.todonoh/bin"
mkdir -p "$CACHE"
if [ ! -x "$CACHE/frankenphp" ] || [ "$DIR/frankenphp.gz" -nt "$CACHE/frankenphp" ]; then
    cp "$DIR/frankenphp.gz" "$CACHE/frankenphp.gz"
    gunzip -f "$CACHE/frankenphp.gz"
    chmod 755 "$CACHE/frankenphp"
fi
exec "$CACHE/frankenphp" "$@"
