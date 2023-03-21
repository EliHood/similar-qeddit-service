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

- In case you see that changes aren't apply, run `make start-without-cache`, to cleanup stateful data rebuild the images. **Warning: This command will remove you database data.**

- You can modify the list of required env variables here: `./config/validate.sh`. This way you'll be notified if some env variable is expected by the deployment, but missing on running the deployment.

## Setting up GitHub actions

You need to provide following environment variables to the GitHub actions job:

`DOCKER_USERNAME` - Docker Hub username
`DOCKER_PASSWORD` - Docker Hub password
`VM_SSH_KEY` - SSH key to access the VM

[📘 Creating encrypted secrets for a repository](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository)

In case you need to deploy new branch, you should add it a new VM host to `./deploy.sh` script:

```bash
# ...
if [[ "${git_branch}" == "develop" ]]; then
	vm_host="ec2-user@ec2-35-170-63-226.compute-1.amazonaws.com"
elif [[ "${git_branch}" == "new-branch-1" ]]; then
	vm_host="ec2-user@ec2-22-333-44-555.compute-2.amazonaws.com"
# ...
```
