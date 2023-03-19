### Instructions

simply replace .env_local.env to .env, and you will have the environment variables needed to run this api.

### For executing Docker(have your env variables set up)

By default docker compose yml will read .env variables if its not set already, or you can pass environments via build like the following:

`docker run -it -p 5432:5432 --env POSTGRES_HOST=db container name`
