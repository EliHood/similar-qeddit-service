#!/usr/bin/env bash

set -eo pipefail

script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
git_root=$(git rev-parse --show-toplevel)
docker_image=$($script_dir/get-docker-image.sh)

echo "Building docker image $docker_image"

docker build -t $docker_image -f $script_dir/Dockerfile $git_root