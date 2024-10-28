# Cypress Test Automation Setup

This repository contains the setup for automating API tests using Cypress, with a focus on CRUD operations for a user account API. It includes tests for various scenarios, including edge cases, performance, security, and data-driven tests.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Containerization with Docker](#containerization-with-docker)


## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (version 14 or later).
- [Docker](https://www.docker.com/products/docker-desktop/) (for containerization).

## Installation

1. **Clone this repository**:
   ```bash
   git clone https://github.com/AliZikry/api-testing.git
   cd api-testing
2. **Install dependencies (including cypress)**:
   ```bash
   npm install

## Running Tests

1. **To run the tests in headless mode**:
   ```bash
   npx cypress run
2. **To run the tests in headed mode**:
   ```bash
   npx cypress open

## Containerization with Docker

- **Build the Docker image**:
   ```bash
   docker build -t cypress-app .

## Run the Docker container (executing the tests)

 1. **Using the Dockerfile alone**
    ```bash
    docker run -it --rm cypress-app
 2. **Using Docker Compose**
    ```bash
    docker-compose up --build
 - **Run tests in headed mode**
    by modifying the CMD in Dockerfile to:
   ```bash
   CMD ["npx", "cypress", "open"]

