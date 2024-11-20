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

### Running the Project
Start the services using Docker Compose:
```bash
docker-compose up -d
```
This will set up the required database and run the API.

Start the API server:
```bash
npm start
```

Alternatively, you can use Make commands to run the project:
```bash
make start
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