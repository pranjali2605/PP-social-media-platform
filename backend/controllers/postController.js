const Post = require("../models/Post");


// CREATE POST

exports.createPost = async (req, res) => {

  try {

    const { caption, mediaUrl } = req.body;

    const post = await Post.create({
      user: req.user,
      caption,
      mediaUrl
    });

    res.status(201).json(post);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// GET ALL POSTS

exports.getPosts = async (req, res) => {

  try {

    const posts = await Post.find()
      .populate("user", "username profilePic")
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// LIKE POST

exports.likePost = async (req, res) => {

  try {

    const post = await Post.findById(req.params.id);

    const alreadyLiked = post.likes.includes(req.user);

    if (alreadyLiked) {

      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user
      );

    } else {

      post.likes.push(req.user);

    }

    await post.save();

    res.json(post);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// DELETE POST

exports.deletePost = async (req, res) => {

  try {

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user) {

      return res.status(403).json({
        message: "Not authorized to delete this post"
      });

    }

    await post.deleteOne();

    res.json({ message: "Post deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

exports.getFeed = async (req, res) => {

  try {

    const User = require("../models/User");

    const currentUser = await User.findById(req.user);

    const posts = await Post.find({
      user: { $in: currentUser.following }
    })
      .populate("user", "username profilePic")
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};