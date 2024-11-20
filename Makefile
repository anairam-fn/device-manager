# Define variables for common commands and options
DOCKER_COMPOSE = docker-compose
NPM = npm
PORT = 3000

# Default target
all: help

# Start the development environment
start:
	$(NPM) install
	$(DOCKER_COMPOSE) up -d
	$(NPM) start

# Stop and remove containers
stop:
	$(DOCKER_COMPOSE) down

# Install dependencies
install:
	$(NPM) install

# Run unit tests
test:
	$(NPM) run test-unit

# Display the API documentation
docs:
	@echo "Access the API documentation at: http://localhost:$(PORT)/api-docs"

# Help
help:
	@echo "Available commands:"
	@echo "  make start      - Start the application and database"
	@echo "  make stop       - Stop and remove containers"
	@echo "  make install    - Install dependencies"
	@echo "  make test       - Run unit tests"
	@echo "  make docs       - Display the API documentation URL"
	@echo "  make help       - Show this help message"
