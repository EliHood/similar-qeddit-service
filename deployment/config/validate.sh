#!/usr/bin/env bash
set -eo pipefail

# List of environment variables that MUST be set.
vars="POSTGRES_DB POSTGRES_USER POSTGRES_PASS POSTGRES_HOST POSTGRES_PORT"
vars="${vars} JWT_SECRET PASSPORT_CLIENT_ID PASSPORT_CLIENT_SECRET PASSPORT_CALLBACK_URL"
vars="${vars} ALLOW_ORIGIN"
vars="${vars} NODEMAIL_USER NODEMAIL_PASS"
vars="${vars} PORT"
var="${vars} BACKEND_DOCKER_IMAGE"

function validate_env() {
	for var in $vars; do
		if [ -z "${!var}" ]; then
			echo "ERROR: $var is not set"
			exit 1
		fi
	done
}

validate_env

function print_config() {
	echo "Deployment config:"

	echo "POSTGRES_DB ${POSTGRES_DB}"
	echo "POSTGRES_USER ${POSTGRES_USER}"
	echo "POSTGRES_PASS **********"
	echo "POSTGRES_HOST ${POSTGRES_HOST}"
	echo "POSTGRES_PORT ${POSTGRES_PORT}"

	echo "JWT_SECRET **********"
	echo "PASSPORT_CLIENT_ID ${PASSPORT_CLIENT_ID}"
	echo "PASSPORT_CLIENT_SECRET **********"
	echo "PASSPORT_CALLBACK_URL ${PASSPORT_CALLBACK_URL}"

	echo "ALLOW_ORIGIN ${ALLOW_ORIGIN}"

	echo "NODEMAIL_USER ${NODEMAIL_USER}"
	echo "NODEMAIL_PASS **********"

	echo "PORT ${PORT}"

	echo "BACKEND_DOCKER_IMAGE ${BACKEND_DOCKER_IMAGE}"
}

print_config