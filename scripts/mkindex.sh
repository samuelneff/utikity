#!/usr/bin/env bash

_script_file_rel_path="${BASH_SOURCE[0]}"
if [[ "$_script_file_rel_path" == "" ]]; then
  _script_file_rel_path="${(%):-%N}"
fi

_script_file_path="`realpath $_script_file_rel_path`"
_script_dir="`dirname $_script_file_path`"
_project_dir=`realpath $_script_dir/..`
_src_dir="$_project_dir/src"

_write_index() {
  ls $_src_dir/*.ts \
    | grep -v 'index.ts' \
    | sed -E 's,.+/(.+)\.ts,export * from \x27./\1\x27;,' \
    > $_src_dir/index.ts

  echo "Generated index.ts"
}

_write_index

if [[ "$1" == "--watch" ]]; then
  echo "Watching for changes to create index.ts upon updates"
  fswatch -0  --event Created --event Removed --exclude "$_sir_dir/index.ts" "$_src_dir" | while read -d "" _ignore
  do
    _write_index
  done
fi
