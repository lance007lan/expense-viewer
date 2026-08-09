#!/usr/bin/env bash
set -euo pipefail

# Builds both frontend apps and merges their output into dist-deploy/,
# laid out exactly as it needs to appear once synced to the shared S3
# bucket's root (see pulumi/frontend.ts's S3BucketFolder):
#
#   dist-deploy/                  <- host, at the bucket root
#   dist-deploy/charts-remote/    <- its Module Federation remote
#
# host is built with VITE_CHARTS_REMOTE_URL set to a same-origin path
# (not a full URL) — since both apps land in the same bucket/domain,
# host never needs to know that domain ahead of time.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

OUT_DIR="dist-deploy"

echo "==> Building charts-remote..."
pnpm --filter charts-remote build

echo "==> Building host (charts-remote at same-origin path /charts-remote/)..."
VITE_CHARTS_REMOTE_URL="/charts-remote/assets/remoteEntry.js" pnpm --filter host build

echo "==> Staging merged output in $OUT_DIR/ ..."
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"
cp -r host/dist/. "$OUT_DIR/"
mkdir -p "$OUT_DIR/charts-remote"
cp -r charts-remote/dist/. "$OUT_DIR/charts-remote/"
# charts-remote's index.html is only for its own standalone dev preview —
# nothing in production ever loads it, the host only fetches remoteEntry.js
# and the exposed chunk directly.
rm -f "$OUT_DIR/charts-remote/index.html"

echo "==> Done: $SCRIPT_DIR/$OUT_DIR"
