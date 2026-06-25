const Task = require("../models/Task");
const Board = require("../models/Board");

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalBoards = await Board.countDocuments({
      user: userId,
    });

    const totalTasks = await Task.countDocuments({
      user: userId,
    });

    const completedTasks =
      await Task.countDocuments({
        user: userId,
        status: "done",
      });

    const pendingTasks =
      await Task.countDocuments({
        user: userId,
        status: {
          $ne: "done",
        },
      });

    res.json({
      totalBoards,
      totalTasks,
      completedTasks,
      pendingTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};