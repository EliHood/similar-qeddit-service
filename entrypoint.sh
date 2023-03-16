#!/bin/sh
# docker exec -it  fullstacktypescript_database_1 psql -U postgres -c "CREATE DATABASE elitypescript"
yarn run build
yarn run migrate
yarn run server

