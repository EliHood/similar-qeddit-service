#!/usr/bin/env bash

set -eo pipefail
script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

source $script_dir/../config/populate.sh

# Pull latest changes
docker-compose pull

# Start containers
docker-compose up -d