#!/usr/bin/env bash
set -eo pipefail

# List of environment variables that MUST be set.
vars="POSTGRES_DB POSTGRES_USER POSTGRES_PASS POSTGRES_HOST POSTGRES_PORT"
vars="${vars} JWT_SECRET PASSPORT_CLIENT_ID PASSPORT_CLIENT_SECRET PASSPORT_CALLBACK_URL"
vars="${vars} ALLOW_ORIGIN"
vars="${vars} NODEMAIL_USER NODEMAIL_PASS"
vars="${vars} PORT"

function validate_env() {
  for var in $vars; do
	if [ -z "${!var}" ]; then
	  echo "ERROR: $var is not set"
	  exit 1
	fi
  done
}

validate_env