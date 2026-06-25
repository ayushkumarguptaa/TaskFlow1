const User =
  require("../models/User");

const bcrypt =
  require("bcryptjs");

const generateToken =
  require("../utils/generateToken");

exports.registerUser =
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      const exists =
        await User.findOne({
          email,
        });

      if (exists) {
        return res
          .status(400)
          .json({
            message:
              "User already exists",
          });
      }

      const hashed =
        await bcrypt.hash(
          password,
          10
        );

      const user =
        await User.create({
          email,
          password:
            hashed,
        });

      const token =
        generateToken(
          user._id
        );

      res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

      res.status(201).json({
        user: {
          _id:
            user._id,
          email:
            user.email,
        },
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };
//LOGIN USER
exports.loginUser =
  async (req, res) => {
    try {
        const {email,password,} = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (
        !user ||
        !(await bcrypt.compare(
          password,
          user.password
        ))
      ) {
        return res
          .status(401)
          .json({
            message:
              "Invalid Credentials",
          });
      }

      const token =
        generateToken(
          user._id
        );

      res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

      res.json({
        user: {
          _id:
            user._id,
          email:
            user.email,
        },
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

exports.logoutUser =
  (req, res) => {
    res.clearCookie(
      "token"
    );

    res.json({
      message:
        "Logged out",
    });
  };

exports.getCurrentUser =
  async (
    req,
    res
  ) => {
    const user =
      await User.findById(
        req.user.id
      ).select(
        "-password"
      );

    res.json(user);
  };