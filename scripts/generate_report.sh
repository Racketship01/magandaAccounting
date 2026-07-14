#!/usr/bin/env bash
set -euo pipefail

log_dir="${HOME}/.cache/daily-report"
log_file="${log_dir}/errors.log"
mkdir -p "$log_dir"
mkdir -p "$log_dir"

on_error() {
  local exit_code=$?
  local line_no=${1:-unknown}
  local cmd=${2:-unknown}
  {
    echo "[$(date -Iseconds)] ERROR exit=$exit_code line=$line_no cmd=$cmd"
    echo "pwd=$PWD"
    echo "branch=$(git branch --show-current 2>/dev/null || true)"
    echo "commit=$(git rev-parse --short HEAD 2>/dev/null || true)"
    echo "---"
  } >> "$log_file"
}

trap 'on_error ${LINENO} "${BASH_COMMAND}"' ERR

branch=$(git branch --show-current || true)
commit=$(git rev-parse --short HEAD)
date=$(date +"%Y-%m-%d")
status=$(git status --short || true)

cat > daily-report.md <<EOF
# Daily Report

**Date:** $date  
**Branch:** ${branch:-detached-head}  
**Commit:** $commit

## Summary
- Automated report generated from a Git hook.

## Progress
- Branch: ${branch:-detached-head}
- Commit: $commit
- Working tree status: $( [ -n "$status" ] && echo "dirty" || echo "clean" )

## Blockers
- None.

## Next Steps
- Continue work.
- Review pending changes.
EOF