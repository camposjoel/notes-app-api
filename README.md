# 📝 Notes API

A high-performance RESTful API for a Notes application, built with **Bun**, **Elysia.js**, and **PostgreSQL**. This project features JWT-based authentication, a clean service-oriented architecture, and automatic Swagger documentation.

## 🚀 Technologies

- **Runtime:** [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime.
- **Framework:** [Elysia.js](https://elysiajs.com/) - Ergonamic Framework for Bun.
- **Database:** [PostgreSQL](https://www.postgresql.org/) - Reliable relational database.
- **ORM/Query Builder:** Bun's native `SQL` driver.
- **Authentication:** JWT (JSON Web Tokens) via `@elysiajs/jwt`.
- **Documentation:** Swagger UI via `@elysiajs/swagger`.

## ✨ Features

- **User Authentication:** 
  - User registration and login.
  - Secure password hashing (handled in service layer).
  - JWT-based authorization for protected routes.
- **Notes Management (CRUD):**
  - Create, Read, Update, and Delete notes.
  - Ownership validation (users can only access their own notes).
- **Interactive API Docs:** Built-in Swagger UI for easy endpoint testing.
- **Validation:** Type-safe request bodies using Elysia's schema validation.

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
- A running [PostgreSQL](https://www.postgresql.org/) instance.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd notes-api
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory (refer to `.env.local` for reference, but do not commit it):
   ```env
   DATABASE_URL=postgres://user:password@localhost:5432/notes_db
   JWT_SECRET=your_super_secret_key
   ```

4. Initialize the database:
   Use the provided schema to create the necessary tables:
   ```bash
   psql -d notes_db -f src/db/schema.sql
   ```

### Development

Start the development server with hot reload:
```bash
bun run dev
```

The API will be available at `http://localhost:3000`.

## 📖 API Documentation

Once the server is running, you can access the interactive Swagger documentation at:
`http://localhost:3000/swagger`

### Primary Endpoints

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Register a new user | No |
| `POST` | `/auth/login` | Login and receive JWT | No |
| `GET` | `/notes` | Get all notes for current user | Yes |
| `GET` | `/notes/:id` | Get a specific note | Yes |
| `POST` | `/notes` | Create a new note | Yes |
| `PUT` | `/notes/:id` | Update an existing note | Yes |
| `DELETE` | `/notes/:id` | Delete a note | Yes |

## 🏗️ Project Structure

- `src/index.ts`: Application entry point and route registration.
- `src/auth/`: User authentication logic, models, and routes.
- `src/notes/`: Notes CRUD logic, models, and routes.
- `src/db/`: Database connection and schema definitions.

## 📄 License

This project is open-source and available under the MIT License.