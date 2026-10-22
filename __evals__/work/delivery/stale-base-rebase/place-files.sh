#!/usr/bin/env bash
set -eu
case_dir=$(cd "$(dirname "$0")" && pwd -P)
"$case_dir/../../fixture/setup.sh" "$case_dir/files"
