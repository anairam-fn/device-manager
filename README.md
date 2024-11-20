# Device Management API

A RESTful API for managing devices, providing functionalities such as creating, retrieving, updating, and deleting device records.

## Features

- Create a new device
- Retrieve a device by its ID
- List all devices
- Get devices by brand
- Update device details
- Delete a device
- Swagger API documentation available at `/api-docs`

## API Endpoints

### Devices

| Method | Endpoint                     | Description                   |
|--------|-------------------------------|-------------------------------|
| POST   | `/device`                    | Create a new device           |
| GET    | `/device/:id`                | Retrieve a device by its ID   |
| GET    | `/devices`                   | List all devices              |
| GET    | `/devices/brand/:brand`      | Get devices by brand          |
| PATCH  | `/device/:id`                | Update device details         |
| DELETE | `/device/:id`                | Delete a device               |

### API Documentation
The full API documentation is available at [`/api-docs`](http://localhost:3000/api-docs).

## Getting Started

### Prerequisites
- **Node.js**: Version 14 or higher
- **Docker**: Ensure Docker and Docker Compose are installed on your machine
- **Make**: Optional

### Installation
1. Clone the repository:
  ```bash
  git clone <repository-url>
  cd device-manager
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

## Running the Project

Before running the project, ensure you have a `.env` file with the database credentials as specified in the `.env.example` file.

### Using Docker and Makefile

1. **Start the services and database**:
  You can use the Makefile to set up the entire environment:
  ```bash
  make build
  ```

  This will:
  - Install dependencies
  - Set up the required database with Docker Compose
  - Run the Prisma migrations
  - Generate Prisma client

2. **Start the API server**:
  After the services are up, use the following command to start the application:
  ```bash
  make start
  ```

3. **Stop the services**:
  To stop and remove the Docker containers, run:
  ```bash
  make stop
  ```

### Direct Commands (without Makefile)

Alternatively, if you prefer not to use the Makefile, you can manually run the following commands:

1. **Start the services with Docker Compose**:
  ```bash
  docker-compose up -d
  ```

2. **Start the API server**:
  ```bash
  npm start
  ```

3. **Run Prisma Migrations**:
  To apply the Prisma migrations manually, use the following command:
  ```bash
  npx prisma migrate deploy
  ```

4. **Generate Prisma Client**:
  If you need to regenerate the Prisma Client, run:
  ```bash
  npx prisma generate
  ```

Access the Swagger API documentation at:
```bash
http://localhost:3000/api-docs
```

### Running Unit Tests
Run the following command to execute the unit tests:
```bash
npm run test-unit
```

Alternatively, you can use Make commands to run the tests:
```bash
make test
```

### Environment Variables
Ensure you have the following environment variables configured in a `.env` file:

| Variable      | Description             | Default Value               |
|---------------|-------------------------|-----------------------------|
| PORT          | API server port         | 3000                        |
| DATABASE_URL  | Database connection URL | (Provided by Docker Compose)|

## Technologies Used
- Node.js with Express
- Zod for request validation
- Swagger for API documentation
- Jest for testing
- Docker for containerization
- PostgreSQL as the database

## Contributing
Feel free to fork the repository, create a new branch, and submit pull requests for improvements or bug fixes.

Enjoy managing your devices! 🚀