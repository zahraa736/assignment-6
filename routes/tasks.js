const express = require("express");
const router = express.Router();
const db = require("../database");

// Validate task ID
function validateId(req, res, next) {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "Invalid task ID"
        });
    }

    req.taskId = id;
    next();
}

// Validate task data
function validateTask(req, res, next) {
    const { title, description, completed } = req.body;

    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
            error: "Title is required and must be a non-empty string"
        });
    }

    if (
        description !== undefined &&
        typeof description !== "string"
    ) {
        return res.status(400).json({
            error: "Description must be a string"
        });
    }

    if (
        completed !== undefined &&
        typeof completed !== "boolean"
    ) {
        return res.status(400).json({
            error: "Completed must be true or false"
        });
    }

    next();
}

// GET all tasks
router.get("/", (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                error: "Database error"
            });
        }

        const tasks = rows.map(task => ({
            ...task,
            completed: Boolean(task.completed)
        }));

        res.status(200).json(tasks);
    });
});

// GET one task
router.get("/:id", validateId, (req, res) => {
    db.get(
        "SELECT * FROM tasks WHERE id = ?",
        [req.taskId],
        (err, row) => {
            if (err) {
                return res.status(500).json({
                    error: "Database error"
                });
            }

            if (!row) {
                return res.status(404).json({
                    error: "Task not found"
                });
            }

            res.status(200).json({
                ...row,
                completed: Boolean(row.completed)
            });
        }
    );
});

// CREATE task
router.post("/", validateTask, (req, res) => {
    const { title, description = "", completed = false } = req.body;

    db.run(
        "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)",
        [title.trim(), description, completed ? 1 : 0],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: "Database error"
                });
            }

            res.status(201).json({
                id: this.lastID,
                title: title.trim(),
                description,
                completed
            });
        }
    );
});

// UPDATE task
router.put("/:id", validateId, validateTask, (req, res) => {
    const { title, description = "", completed = false } = req.body;

    db.run(
        `UPDATE tasks
         SET title = ?, description = ?, completed = ?
         WHERE id = ?`,
        [title.trim(), description, completed ? 1 : 0, req.taskId],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: "Database error"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: "Task not found"
                });
            }

            res.status(200).json({
                id: req.taskId,
                title: title.trim(),
                description,
                completed
            });
        }
    );
});

// DELETE task
router.delete("/:id", validateId, (req, res) => {
    db.run(
        "DELETE FROM tasks WHERE id = ?",
        [req.taskId],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: "Database error"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: "Task not found"
                });
            }

            res.status(200).json({
                message: "Task deleted successfully"
            });
        }
    );
});

module.exports = router;