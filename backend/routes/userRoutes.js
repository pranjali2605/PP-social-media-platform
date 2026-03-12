const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  followUser,
  unfollowUser,
  getUserProfile
} = require("../controllers/userController");


// FOLLOW USER
router.post("/:id/follow", authMiddleware, followUser);

// UNFOLLOW USER
router.post("/:id/unfollow", authMiddleware, unfollowUser);

// GET USER PROFILE
router.get("/:id", authMiddleware, getUserProfile);

module.exports = router;