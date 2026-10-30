const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Database file path
const dbPath = path.join(__dirname, "data", "tasks.db");

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

// Create tasks table
db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed INTEGER DEFAULT 0
    )
`, (err) => {
    if (err) {
        console.error("Error creating tasks table:", err.message);
    } else {
        console.log("Tasks table ready");
    }
});

module.exports = db;