# Nest.js Microservices Backend

This project is a Nest.js backend application built with a microservices architecture. It includes a gateway service and two microservices (users and products) with basic CRUD operations.

## Features

- Microservices architecture with a gateway and domain-specific services
- Swagger OpenAPI documentation
- Basic CRUD operations for users and products
- TypeScript support
- Validation using class-validator
- Error handling

## Prerequisites

- Node.js (v14 or later)
- npm or yarn

## Installation

```bash
# Install dependencies
npm install
```

## Running the Application

### Development Mode

To run the application in development mode:

```bash
# Start the gateway service
npm run start:dev

# In separate terminal windows, start each microservice
npm run start:dev users
npm run start:dev products
```

### Production Mode

To run the application in production mode:

```bash
# Build the application
npm run build

# Start the gateway service
npm run start:prod

# In separate terminal windows, start each microservice
node dist/microservices/users/main
node dist/microservices/products/main
```

## API Documentation

Once the application is running, you can access the Swagger UI documentation at:

```
http://localhost:3000/api/docs
```

## Project Structure

```
src/
├── gateway/                  # Gateway service
│   ├── controllers/          # API controllers
│   ├── dto/                  # Data Transfer Objects
│   ├── app.module.ts         # Main module
│   └── main.ts               # Entry point
├── microservices/
│   ├── users/                # Users microservice
│   │   ├── controllers/      # Message pattern handlers
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── entities/         # Entity definitions
│   │   ├── services/         # Business logic
│   │   ├── users.module.ts   # Module definition
│   │   └── main.ts           # Entry point
│   └── products/             # Products microservice
│       ├── controllers/      # Message pattern handlers
│       ├── dto/              # Data Transfer Objects
│       ├── entities/         # Entity definitions
│       ├── services/         # Business logic
│       ├── products.module.ts # Module definition
│       └── main.ts           # Entry point
└── shared/                   # Shared code
    ├── interfaces/           # Shared interfaces
    └── utils/                # Utility functions
```

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run test coverage
npm run test:cov
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.