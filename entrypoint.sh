#!/bin/sh
npm install -g npm@latest
npx --v
# docker exec -it db psql -U postgres elifullstack
yarn run migrate
yarn run build
yarn run server

