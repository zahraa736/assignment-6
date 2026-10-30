# HW6 - Task Manager REST API

## Project Description

This project is a RESTful API developed using Node.js, Express.js, and SQLite3.

The API allows users to create, read, update, and delete tasks using CRUD operations.

All tasks are stored in a persistent SQLite database.

## Technologies Used

- Node.js
- Express.js
- SQLite3
- dotenv
- JSON
- REST API

## Installation and Setup

### Step 1: Install Dependencies

Open the terminal inside the project folder and run:

```bash
npm install
```

### Step 2: Configure Environment Variables

Create a file named `.env` in the root directory.

Add the following line:

```env
PORT=3000
```

### Step 3: Start the Server

Run the following command:

```bash
node server.js
```

The server will run at:

http://localhost:3000

## Database Structure

The project uses SQLite3 to store tasks.

The database contains a table named `tasks` with the following fields:

- id: Unique identifier for each task.
- title: Title of the task.
- description: Description of the task.
- completed: Completion status of the task.

The database is stored in the `data/tasks.db` file.

## API Endpoints

The API supports five RESTful endpoints.

### 1. GET /tasks

This endpoint retrieves all tasks from the database.

Request:

```bash
curl http://localhost:3000/tasks
```

Example Response (200 OK):

```json
[
  {
    "id": 1,
    "title": "Study",
    "description": "Complete homework",
    "completed": false
  }
]
```

If no tasks exist, the API returns an empty array:

```json
[]
```

### 2. GET /tasks/:id

This endpoint retrieves a specific task using its ID.

Request:

```bash
curl http://localhost:3000/tasks/1
```

Example Response (200 OK):

```json
{
  "id": 1,
  "title": "Study",
  "description": "Complete homework",
  "completed": false
}
```

If the task does not exist, the API returns a 404 error.

Example Error Response:

```json
{
  "error": "Task not found"
}
```

### 3. POST /tasks

This endpoint creates a new task.

Request:

```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{"title":"Study","description":"Complete homework","completed":false}'
```

Example Response (201 Created):

```json
{
  "id": 1,
  "title": "Study",
  "description": "Complete homework",
  "completed": false
}
```

### 4. PUT /tasks/:id

This endpoint updates an existing task.

Request:

```bash
curl -X PUT http://localhost:3000/tasks/1 \
-H "Content-Type: application/json" \
-d '{"title":"Study","description":"Homework completed","completed":true}'
```

Example Response (200 OK):

```json
{
  "id": 1,
  "title": "Study",
  "description": "Homework completed",
  "completed": true
}
```

### 5. DELETE /tasks/:id

This endpoint deletes a task using its ID.

Request:

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

Example Response (200 OK):

```json
{
  "message": "Task deleted successfully"
}
```

## HTTP Status Codes

The API uses appropriate HTTP status codes.

- 200 OK: The request was successful.
- 201 Created: A new task was created successfully.
- 400 Bad Request: The request contains invalid input.
- 404 Not Found: The requested task does not exist.
- 500 Internal Server Error: An unexpected server or database error occurred.

## Input Validation

The API validates incoming data before creating or updating tasks.

Validation rules:

- The title is required and must be a non-empty string.
- The description must be a string when provided.
- The completed field must be a boolean when provided.
- Task IDs must be positive integers.

### Invalid Input Example

Request:

```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{"description":"Missing title"}'
```

Example Response (400 Bad Request):

```json
{
  "error": "Title is required and must be a non-empty string"
}
```

## Error Handling

The API includes error handling for:

- Invalid JSON input.
- Missing required fields.
- Incorrect data types.
- Invalid task IDs.
- Tasks that do not exist.
- Database errors.

Error messages are returned in JSON format with appropriate HTTP status codes.

## API Testing

The API was tested using curl commands in the terminal.

The following operations were tested:

1. GET all tasks.
2. GET a task by ID.
3. POST a new task.
4. PUT an existing task.
5. DELETE a task.
6. GET a nonexistent task to verify the 404 response.
7. POST invalid data to verify the 400 response.

The test results are saved in:

`tests/test-results.txt`

## Project Structure

```text
HW6/
├── data/
│   └── tasks.db
├── routes/
│   └── tasks.js
├── tests/
│   └── test-results.txt
├── .env
├── .env.example
├── .gitignore
├── database.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

The `.env` file, `node_modules` folder, and SQLite database file are excluded from Git using `.gitignore`.

## Conclusion

This project demonstrates how to build a RESTful API using Node.js, Express.js, and SQLite3.

The API implements complete CRUD functionality, persistent database storage, input validation, and error handling.

All five API endpoints were tested successfully using curl.