# expense-viewer dev commands

# List available commands
default:
    @just --list

# Start PostgreSQL in the background
db:
    docker compose up -d

# Stop PostgreSQL
db-stop:
    docker compose down

# Run the Spring Boot backend (starts DB first)
backend: db
    cd backend && ./mvnw spring-boot:run

# Run the React frontend dev server
frontend:
    cd frontend && npm run dev

# Start everything for local development
dev: db
    #!/usr/bin/env bash
    cd backend && ./mvnw spring-boot:run &
    cd frontend && npm run dev

# Run backend tests
test-backend:
    cd backend && ./mvnw test

# Run frontend tests
test-frontend:
    cd frontend && npm test

# Run all tests
test: test-backend test-frontend

# Build the backend JAR
build-backend:
    cd backend && ./mvnw package -DskipTests

# Build the frontend for production
build-frontend:
    cd frontend && npm run build

# Build everything
build: build-backend build-frontend

# Terraform plan
tf-plan:
    cd terraform && terraform plan

# Terraform apply
tf-apply:
    cd terraform && terraform apply

# Terraform destroy
tf-destroy:
    cd terraform && terraform destroy
