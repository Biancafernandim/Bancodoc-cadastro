# Full-Stack Employee Management Application

This repository contains a full-stack web application with a React frontend and a Node.js backend. The application is designed to manage clients, suppliers, and collaborators, and it is fully containerized using Docker for easy setup and deployment.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Running Tests](#running-tests)
- [Contributing](#contributing)

## Features

- **Backend**: A Node.js server using the Express framework.
- **Database**: PostgreSQL database managed with Prisma ORM.
- **Frontend**: A React application built with Vite.
- **Containerization**: Fully containerized with Docker and Docker Compose for a consistent development environment.

## Project Structure

The repository is organized into two main directories:

-   `backend/`: Contains the Node.js Express server, Prisma schema, and backend Dockerfile.
-   `frontend/`: Contains the React application, including all components, styles, and the frontend Dockerfile.
-   `docker-compose.yml`: The main Docker Compose file for orchestrating the services.
-   `README.md`: This file.

## Architecture

The application is composed of three main services defined in `docker-compose.yml`:

-   **`frontend`**: A React application that serves the user interface. It runs on port `5173`.
-   **`backend`**: A Node.js API that handles the business logic and interacts with the database. It runs on port `3001`.
-   **`db`**: A PostgreSQL database instance to persist data. It runs on port `5432`.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

-   [Docker](https://docs.docker.com/get-docker/)
-   [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

To get the application up and running, follow these simple steps:

1.  **Clone the repository:**

    Use `git clone` to clone this repository to your local machine, then navigate into the newly created directory.

2.  **Build and run the application with Docker Compose:**

    ```sh
    docker-compose up --build
    ```

    This command will build the Docker images for the frontend and backend services and start all the containers.

3.  **Access the application:**

    -   **Frontend**: Open your web browser and navigate to [http://localhost:5173](http://localhost:5173).
    -   **Backend API**: The API is accessible at [http://localhost:3001](http://localhost:3001).
    -   Ótima pergunta! Depois de iniciar a aplicação com o comando sudo docker compose up --build -d, você pode acessar e verificar as telas nos seguintes endereços:

        Página Inicial: http://localhost:5173/
        Clientes: http://localhost:5173/clientes
        Fornecedores: http://localhost:5173/fornecedores
        Cadastrar Colaborador: http://localhost:5173/colaboradores/cadastrar
        Contratos: http://localhost:5173/contratos

## Usage

The frontend provides a simple interface to interact with the application. The backend exposes a RESTful API to manage the application's data.

### Frontend

The frontend is a standard Vite + React application. You can modify the source code in the `frontend/src` directory. The changes will be reflected in real-time thanks to Vite's Hot Module Replacement (HMR).

### Backend

The backend server provides several endpoints to manage clients, suppliers, and collaborators.

## API Endpoints

All endpoints are available under the base URL `http://localhost:3001`.

### Clientes

-   `POST /clientes`: Creates a new client.
    -   **Body**: `{ "nome": "string" }`
-   `GET /clientes`: Retrieves a list of all clients.

### Fornecedores (Suppliers)

-   `POST /fornecedores`: Creates a new supplier.
    -   **Body**: `{ "nome": "string", "cnpj": "string" }`
-   `GET /fornecedores`: Retrieves a list of all suppliers.

### Colaboradores (Collaborators)

-   `POST /colaboradores`: Creates a new collaborator.
    -   **Body**:
        ```json
        {
          "nome": "string",
          "cpf": "string",
          "dataNascimento": "YYYY-MM-DD",
          "nomeMae": "string",
          "dataAdmissao": "YYYY-MM-DD",
          "fornecedorId": integer
        }
        ```
-   `GET /colaboradores`: Retrieves a list of all collaborators.

## Dependencies and Scripts

This section provides an overview of the npm scripts and dependencies for each part of the application.

### Backend (`backend/package.json`)

#### Scripts

-   `test`: A placeholder command that currently does not run any tests.
-   `dev`: Starts the backend server in development mode using `nodemon`. `nodemon` automatically restarts the server whenever file changes are detected.
-   `postinstall`: A script that runs automatically after `npm install`. It executes `npx prisma generate` to generate the Prisma Client based on the database schema.

#### Dependencies

-   `express`: A fast, unopinionated, minimalist web framework for Node.js, used to build the API.

#### Dev Dependencies

-   `@prisma/client`: The Prisma Client library, which provides a type-safe query builder for interacting with the database.
-   `nodemon`: A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
-   `prisma`: The command-line interface (CLI) for Prisma, used for database migrations, schema management, and generating the Prisma Client.

### Frontend (`frontend/package.json`)

#### Scripts

-   `dev`: Starts the Vite development server for the React application.
-   `build`: Bundles the React application for production using Vite.
-   `lint`: Lints the source code using ESLint to find and fix problems.
-   `preview`: Serves the production build locally to preview it before deployment.

#### Dependencies

-   `react`: A JavaScript library for building user interfaces.
-   `react-dom`: Provides DOM-specific methods that can be used at the top level of your app.

#### Dev Dependencies

-   `@vitejs/plugin-react`: The official Vite plugin for React.
-   `eslint` and related plugins: Tooling for static code analysis to find problems and enforce conventions.
-   `vite`: A modern frontend build tool that provides a faster and leaner development experience for modern web projects.

## Running Tests

Currently, this project does not have an automated test suite. The `package.json` files for both the `frontend` and `backend` have a default test script that does not run any tests.

Future contributions should include the addition of unit and integration tests.

## Contributing

We welcome contributions to improve this application! If you'd like to contribute, please follow these steps:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix: `git checkout -b feature-name`.
3.  **Make your changes** and commit them with a clear and descriptive commit message.
4.  **Push your changes** to your fork.
5.  **Create a pull request** to the main repository, explaining the changes you have made.
