# Contributing to Black Coffee Collaborations

Thank you for considering contributing to Black Coffee Collaborations! Your contributions are valuable and help us improve this project. This guide will help you get started.

## Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Submitting Code Changes](#submitting-code-changes)
- [Code of Conduct](#code-of-conduct)

## Project Structure

The repository is organized as follows:

```bash
.
├── README.md
├── apps
│   ├── server
│   ├── client
├── Dockerfile
├── Makefile
├── docker-compose.yml
│
```

- **README.md**: Project overview and setup instructions.
- **apps/server**: Backend server code.
- **apps/client**: Frontend client code.
- **Dockerfile**: Docker configuration for building the project.
- **Makefile**: Build automation tool configuration.
- **docker-compose.yml**: Docker Compose configuration for managing multi-container Docker applications.

## Tech Stack

### Server

- **Golang**: Programming language
- **Gin-gonic**: For handling HTTP requests
- **Sqlx**: For querying the database
- **Postgres**: Database Management System (DBMS)
- **Jwt**: For authentication

### Client

- **React.js**: For building the UI
- **Axios**: For making HTTP requests
- **Vite**: Frontend build tool
- **TailwindCSS**: Utility classes CSS framework

## Getting Started

1. **Fork the repository**: Click on the "Fork" button at the top right corner of the repository page.
2. **Clone your forked repository**:
<<<<<<< HEAD

   ```sh
   git clone https://github.com/<username github>/black-coffee-collaborations.git
   #eg
   git clone https://github.com/guslizikri/black-coffee-collaborations.git

   cd black-coffee-collaborations
   ```

3. **Check that your fork is the "origin" remote**:

   ```sh
     #check the remote origin
      git remote -v

      #add the remote origin
      git remote add origin https://github.com/<username github>/black-coffee-collaborations.git

      #eg
      git remote add origin https://github.com/guslizikri/black-coffee-collaborations.git

      #check the remote origin again
      git remote -v

      #example of remote origin
      origin  https://github.com/<username github>/black-coffee-collaborations.git

   ```

4. **Setup the project repository as the "upstream" remote**:

   ```sh
   git remote add upstream https://github.com/Roisfaozi/black-coffee-collaborations.git

   #check the upstream remote
   git remote -v

   #example of remote origin
      upstream  https://github.com/<username github>/black-coffee-collaborations.git

   #Syncron local repository with project repository

    git pull upstream main
   ```

5. **Set up the development environment**:

   - Ensure you have Docker installed. Follow instructions [here](https://docs.docker.com/get-docker/).

=======
   ```sh
   git clone https://github.com/<your-username>/black-coffee-collaborations.git
   cd black-coffee-collaborations
   ```
3. **Set up the development environment**:
   - Ensure you have Docker installed. Follow instructions [here](https://docs.docker.com/get-docker/).
>>>>>>> upstream/main
   - Build and start the Docker containers:
     ```sh
     docker-compose up --build
     ```

## How to Contribute

### Reporting Bugs

If you find a bug, please report it by [opening an issue](https://github.com/Roisfaozi/black-coffee-collaborations/issues) on GitHub. Include details about the bug, how to reproduce it, and any relevant logs or screenshots.

### Suggesting Features

If you have an idea for a new feature, we'd love to hear about it! Please [open an issue](https://github.com/Roisfaozi/black-coffee-collaborations/issues) and describe the feature in detail, including any benefits or potential use cases.

### Submitting Code Changes

1. **Create a branch**:

   ```sh
<<<<<<< HEAD
   git checkout -b <username github>/your-feature-name

   #eg:
   git checkout -b guslizikri/products
=======
   git checkout -b feature/your-feature-name
>>>>>>> upstream/main
   ```

2. **Make your changes** following the coding standards and best practices.

3. **Commit your changes**:

   ```sh
   git commit -m "Add feature: your feature description"
   ```

4. **Push to your fork**:

   ```sh
   git push origin feature/your-feature-name
<<<<<<< HEAD

   #eg
   git push origin guslizikri/products
=======
>>>>>>> upstream/main
   ```

5. **Create a Pull Request**: Go to the repository on GitHub and open a pull request from your branch. Describe your changes and link any relevant issues.

## Code of Conduct

We are committed to maintaining a welcoming and inclusive environment. Please read and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

By contributing, you agree to abide by the terms outlined in the Code of Conduct.

Thank you for your contributions!

The Black Coffee Collaborations Team
