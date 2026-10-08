#!/bin/bash
set -e

TARGET_DIR="/home/ubuntu/SafeVitals-XR"

echo "[BeforeInstall] Ensuring $TARGET_DIR exists..."
mkdir -p "$TARGET_DIR"

echo "[BeforeInstall] Setting correct permissions..."
chown -R root:root "$TARGET_DIR"
chmod -R 775 "$TARGET_DIR"

echo "[BeforeInstall] Cleaning old files in $TARGET_DIR..."
find "$TARGET_DIR" -mindepth 1 -delete

echo "[BeforeInstall] Cleanup complete."
