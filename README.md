### Instructions

simply replace .env_local.env to .env, and you will have the environment variables needed to run this api.

### For executing Docker(have your env variables set up)

By default docker compose yml will read .env variables if its not set already, or you can pass environments via build like the following:

`docker compose up`

### Other

If using the built image you must have a postgres container instance running on its own.

###### run postgres

`docker run -d -p 5432:5432 --name postgres \ --env POSTGRES_PASSWORD=password \ --env POSTGRES_DB=elifullstack\ postgres`

### Find ip address of running postgres instance

`docker ps`
`docker inspect <postgress container id>`

It will reveal the ip address somewhere in the output, copy it and use it for the below for POSTGRES_HOST

Once found ip of postgres container, we could now do the following:

`docker run -p 3001:3001 -e POSTGRES_DB=elifullstack -e POSTGRES_HOST=172.17.0.2 --link postgres:postgres elihood/similar-reddit-service-docker`

### Deployment

See [deployment/README.md](deployment/README.md) for details.
