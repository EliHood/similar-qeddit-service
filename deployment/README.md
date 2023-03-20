# Deployment

- [ ] Let's assume that you are ssh'ed into your EC2 instance.
- [ ] At first, you need to install Docker and docker-compose. For Amazon Linux 2, you can use this [guide](https://www.cyberciti.biz/faq/how-to-install-docker-on-amazon-linux-2/).

Also you need to install `git` and `make`:

```
sudo yum update
sudo yum install git make
```

- [ ] Now clone the repository and switch to needed branch.

```
git clone https://github.com/EliHood/similar-reddit-service.git
cd ./similar-reddit-service
git checkout develop
```

- [ ] Run `cp .env.example .env` and fill `.env` with actual values.

- [ ] Go to the `./deployment` directory and run `make` command to see a list of available commands.

- [ ] Run `make start` to run the deployment.

### Tips

- In case you see that changes aren't apply, run `make cleanup && make build-without-cache`, then `make start` to cleanup stateful data rebuild the images. **Warning: make cleanup command will remove you database data.**
