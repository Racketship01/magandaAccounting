#!/usr/bin/env bash
set -euo pipefail

git config core.hooksPath .githooks
chmod +x .githooks/post-commit
chmod +x scripts/generate_report.sh
echo "Hooks installed."