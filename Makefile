DOCKER_OPTS ?= --rm

# TEST_ARGS = -v | grep -c RUN
VERSION := $(shell git describe --tags --abbrev=0)

help:
	@echo "Service building targets"
	@echo "  docker: build docker container for web-app"
	@echo "Env:"
	@echo "  DOCKER_OPTS : default docker build options (default : $(DOCKER_OPTS))"

docker:
	docker build -t  github.com/influenzanet/web-app:$(VERSION)  -f Dockerfile $(DOCKER_OPTS) .
