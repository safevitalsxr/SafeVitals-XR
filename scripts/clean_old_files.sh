#!/bin/bash
set -e  # Exit immediately if a command fails

# Deployment target directory (must match appspec.yml destination)
TARGET_DIR="/home/ubuntu/SafeVitals-XR"

echo "[BeforeInstall] Ensuring $TARGET_DIR exists..."
mkdir -p "$TARGET_DIR"

echo "[BeforeInstall] Setting correct permissions..."
# Since runas: root is used in appspec.yml, root will own the directory
chown -R root:root "$TARGET_DIR"
chmod -R 775 "$TARGET_DIR"

echo "[BeforeInstall] Cleaning old files in $TARGET_DIR..."
# The ${TARGET_DIR:?} syntax prevents accidental deletion of /
rm -rf "${TARGET_DIR:?}"/*

echo "[BeforeInstall] Cleanup complete."
