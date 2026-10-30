const express = require("express");
require("dotenv").config();

require("./database");

const tasksRoutes = require("./routes/tasks");

const app = express();

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to HW6 Task Manager API"
    });
});

// Tasks routes
app.use("/tasks", tasksRoutes);

// Error handling
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400) {
        return res.status(400).json({
            error: "Invalid JSON format"
        });
    }

    console.error(err);

    res.status(500).json({
        error: "Internal server error"
    });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});