# Notes API 📝

A modular RESTful API to manage notes, built with Node.js, Express, and SQLite. This project is for educational purposes, focusing on creating a well-structured and maintainable API.

## ✨ Features

-   **CRUD Operations:** Create, Read, Update, and Delete notes.
-   **Modular Structure:** The project is organized into modules for controllers, services, middlewares, and more.
-   **Database:** Uses `better-sqlite3` for synchronous SQLite database access.
-   **Validation:** `zod` is used for request data validation.
-   **Linting and Formatting:** Includes `eslint` and `prettier` for code quality.
-   **Testing:** Comes with a test suite using `mocha` and `supertest`.

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/rickferrdev/notes-api.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd notes-api
    ```

3.  Install the dependencies:

    ```bash
    npm install
    ```

4.  Create a `.env` file from the example:

    ```bash
    cp .env.example .env
    ```

    You can customize the `PORT` in the `.env` file.

### Running the Application

-   **Development Mode:**

    ```bash
    npm run watch
    ```

    This will start the server with `nodemon`, which automatically restarts the server on file changes.

-   **Production Mode:**

    ```bash
    npm start
    ```

## Project Structure

The project follows a modular structure to separate concerns:

```
src/
├── controllers/    # Handles incoming requests and sends responses
├── databases/      # Manages database connections and queries
├── errors/         # Custom error classes and constants
├── middlewares/    # Express middlewares for various tasks
├── responses/      # Standardized response structures
├── routers/        # Defines the API routes
├── services/       # Contains the business logic
├── utils/          # Utility functions
└── validations/    # Data validation schemas
```

## API Endpoints 🛣️

| Method  | Endpoint     | Description                |
| :------ | :----------- | :------------------------- |
| `GET`   | `/notes`     | Get all notes              |
| `GET`   | `/notes/:id` | Get a single note by ID    |
| `POST`  | `/notes`     | Create a new note          |
| `PUT`   | `/notes/:id` | Update a note              |
| `PATCH` | `/notes/:id` | Partially update a note    |
| `DELETE`| `/notes/:id` | Delete a note              |

## 🧪 Testing

To run the test suite, use the following command:

```bash
npm test
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📜 License

This project is [ISC](https.choosealicense.com/licenses/isc/) licensed.
