const Comment = require("../models/Comment");


// CREATE COMMENT

exports.createComment = async (req, res) => {

  try {

    const comment = await Comment.create({
      post: req.params.postId,
      user: req.user,
      text: req.body.text
    });

    res.status(201).json(comment);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// GET COMMENTS FOR POST

exports.getComments = async (req, res) => {

  try {

    const comments = await Comment.find({
      post: req.params.postId
    }).populate("user", "username profilePic");

    res.json(comments);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};