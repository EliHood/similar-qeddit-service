#!/usr/bin/env bash
set -eo pipefail

# List of environment variables that MUST be set.
vars="POSTGRES_DB POSTGRES_USER POSTGRES_PASS POSTGRES_HOST POSTGRES_PORT"

function validate_env() {
  for var in $vars; do
	if [ -z "${!var}" ]; then
	  echo "ERROR: $var is not set"
	  exit 1
	fi
  done
}

validate_env