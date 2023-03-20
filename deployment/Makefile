.DEFAULT_GOAL := help

.PHONY: build-without-cache
build-without-cache: ## Rebuild the application without cache
	docker-compose build --no-cache

.PHONY: start
start: ## Start the application
	source ./.env.example && ./validate-env.sh && docker-compose up -d

.PHONY: stop
stop: ## Stop the application
	docker-compose down

.PHONY: help
help: ## Show this help
	@awk '{ if (NF == 2 && $$1 == "include") { gsub(/\$$\($(git_root_var_name)\)/, "$(git_root)", $$2) ; while ((getline line < $$2) > 0) print line ; close($$2) } else print }' \
		$(firstword $(MAKEFILE_LIST)) \
		| grep -E '^[a-zA-Z_-]+:.*?## .*$$' \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'