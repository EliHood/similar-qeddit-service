#!/usr/bin/env bash

set -eo pipefail

script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
docker_tag=$($script_dir/get-docker-tag.sh)

$script_dir/login.sh

echo "Pushing docker image $docker_tag"

docker push $docker_tag