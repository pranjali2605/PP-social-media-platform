const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createComment,
  getComments
} = require("../controllers/commentController");


router.post("/:postId", authMiddleware, createComment);

router.get("/:postId", authMiddleware, getComments);

module.exports = router;