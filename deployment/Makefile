.DEFAULT_GOAL := help

.PHONY: cleanup
cleanup: ## Remove stateful data
	rm -rf ./postgres-data

.PHONY: start
start: ## Start the application
	./commands/start.sh

.PHONY: stop
stop: ## Stop the application
	./commands/stop.sh

.PHONY: restart
restart: ## Restart the application
	make stop 
	make start

.PHONY: start-without-cache
start-without-cache: ## Start without build cache
	make cleanup
	docker-compose build --no-cache
	make start

.PHONY: deploy
deploy: ## Deploy application to VM
	./deploy.sh

.PHONY: help
help: ## Show this help
	@awk '{ if (NF == 2 && $$1 == "include") { gsub(/\$$\($(git_root_var_name)\)/, "$(git_root)", $$2) ; while ((getline line < $$2) > 0) print line ; close($$2) } else print }' \
		$(firstword $(MAKEFILE_LIST)) \
		| grep -E '^[a-zA-Z_-]+:.*?## .*$$' \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'