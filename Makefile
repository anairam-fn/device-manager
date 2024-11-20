# Define variables for common commands and options
DOCKER_COMPOSE = docker-compose
NPM = npm
PORT = 3000
PRISMA = npx prisma

# Default target
all: help

# Build the development environment
build:
	$(NPM) install
	$(DOCKER_COMPOSE) up -d
	$(PRISMA) migrate deploy
	$(PRISMA) generate

# Start the application
start:
	$(NPM) start

# Stop and remove containers
stop:
	$(DOCKER_COMPOSE) down

# Run unit tests
test:
	$(NPM) run test-unit

# Display the API documentation
docs:
	@echo "Access the API documentation at: http://localhost:$(PORT)/api-docs"

# Help
help:
	@echo "Available commands:"
	@echo "  make start      - Start the application"
	@echo "  make stop       - Stop and remove containers"
	@echo "  make build      - Build the development environment"
	@echo "  make test       - Run unit tests"
	@echo "  make docs       - Display the API documentation URL"
	@echo "  make help       - Show this help message"
