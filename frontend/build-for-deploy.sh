#!/usr/bin/env bash
set -euo pipefail

# Builds all frontend apps and merges their output into dist-deploy/, laid
# out exactly as it needs to appear once synced to the shared S3 bucket's
# root (see pulumi/frontend.ts's S3BucketFolder):
#
#   dist-deploy/                  <- host, at the bucket root
#   dist-deploy/charts-remote/    <- its Module Federation remote
#   dist-deploy/dashboard/        <- its Module Federation remote
#   dist-deploy/import/           <- its Module Federation remote
#
# host is built with each remote URL set to a same-origin path (not a full
# URL) — since all apps land in the same bucket/domain, host never needs to
# know that domain ahead of time.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

OUT_DIR="dist-deploy"

echo "==> Building charts-remote..."
pnpm --filter charts-remote build

echo "==> Building dashboard..."
pnpm --filter dashboard build

echo "==> Building import..."
pnpm --filter import build

echo "==> Building host (remotes at same-origin paths)..."
VITE_CHARTS_REMOTE_URL="/charts-remote/assets/remoteEntry.js" \
VITE_DASHBOARD_REMOTE_URL="/dashboard/assets/remoteEntry.js" \
VITE_IMPORT_REMOTE_URL="/import/assets/remoteEntry.js" \
    pnpm --filter host build

echo "==> Staging merged output in $OUT_DIR/ ..."
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"
cp -r host/dist/. "$OUT_DIR/"

mkdir -p "$OUT_DIR/charts-remote"
cp -r charts-remote/dist/. "$OUT_DIR/charts-remote/"
mkdir -p "$OUT_DIR/dashboard"
cp -r dashboard/dist/. "$OUT_DIR/dashboard/"
mkdir -p "$OUT_DIR/import"
cp -r import/dist/. "$OUT_DIR/import/"

# Each remote's index.html is only for its own standalone dev preview —
# nothing in production ever loads it, host only fetches remoteEntry.js and
# the exposed chunks directly.
rm -f "$OUT_DIR/charts-remote/index.html" "$OUT_DIR/dashboard/index.html" "$OUT_DIR/import/index.html"

echo "==> Done: $SCRIPT_DIR/$OUT_DIR"
