const express = require("express");

const auth = require("../middleware/authMiddleware.js");

const {
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard,
} = require("../controllers/boardController");

const router = express.Router();

router.post("/", auth, createBoard);

router.get("/", auth, getBoards);

router.put("/:id", auth, updateBoard);

router.delete("/:id", auth, deleteBoard);

module.exports = router;