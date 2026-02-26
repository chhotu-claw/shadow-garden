#!/bin/bash
# Publish Shadow's site to GitHub Pages
# Called by the bookkeeper sub-agent after each heartbeat
set -e
cd "$(dirname "$0")"
git add -A
if git diff --cached --quiet; then
  echo "Nothing to publish"
  exit 0
fi
git commit -m "$(date '+%Y-%m-%d %H:%M') — new artifact"
git push origin main
echo "Published"
