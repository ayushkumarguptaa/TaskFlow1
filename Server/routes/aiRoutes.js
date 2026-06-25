const express = require("express");

const auth = require("../middleware/authMiddleware");

const {
  getSuggestion,
} = require("../controllers/aiController");

const router = express.Router();

router.post(
  "/estimate",
  auth,
  getSuggestion
);

module.exports = router;