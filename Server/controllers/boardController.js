const Board = require("../models/Board");
const Task = require("../models/Task");

exports.createBoard = async (req, res) => {
  try {
    const { title, description } = req.body;

    const board = await Board.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(boards);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const board = await Board.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    board.title = req.body.title || board.title;
    board.description =
      req.body.description || board.description;

    await board.save();

    res.json(board);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    const board = await Board.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    await Task.deleteMany({boardId:id});
    await board.deleteOne();

    res.json({
      message: "Board deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};