const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      board,
      priority,
      dueDate,
      estimatedHours,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      board,
      priority,
      dueDate,
      estimatedHours,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getTasksByBoard = async (req, res) => {
  try {
    const tasks = await Task.find({
      board: req.params.boardId,
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    Object.assign(task, req.body);

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//

exports.moveTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.status = req.body.status;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//SEARCH TASKS

exports.searchTasks = async (req, res) => {
  try {
    const { search, status, priority } = req.query;

    let query = {
      user: req.user.id,
    };

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    const tasks = await Task.find(query);

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};