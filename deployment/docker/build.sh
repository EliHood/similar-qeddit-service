#!/usr/bin/env bash

set -eo pipefail

script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
git_root=$(git rev-parse --show-toplevel)
docker_tag=$($script_dir/get-docker-tag.sh)

echo "Building docker image $docker_tag"

docker build -t $docker_tag -f $script_dir/Dockerfile $git_root