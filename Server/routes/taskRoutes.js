const express = require("express");

const auth = require("../middleware/authMiddleware");
// const searchTasks = require("../controllers/taskController.js")

const {
  createTask,
  getTasksByBoard,
  updateTask,
  deleteTask,
  moveTask,
  searchTasks,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", auth, createTask);

router.get("/board/:boardId", auth, getTasksByBoard);

router.put("/:id", auth, updateTask);

router.delete("/:id", auth, deleteTask);

router.patch("/:id/status", auth, moveTask);

router.get("/", auth, searchTasks);

module.exports = router;