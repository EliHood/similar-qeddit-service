#!/usr/bin/env bash

set -eo pipefail

script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
git_root=$(git rev-parse --show-toplevel)

# Load environment variables from .env file
source $git_root/.env

# Set Docker image to use
export BACKEND_DOCKER_IMAGE=$(./docker/get-docker-image.sh)

# Validate configuration
$script_dir/validate.sh