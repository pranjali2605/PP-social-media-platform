const User = require("../models/User");


// FOLLOW USER

exports.followUser = async (req, res) => {

  try {

    const userToFollow = await User.findById(req.params.id);

    const currentUser = await User.findById(req.user);

    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.following.includes(userToFollow._id)) {

      return res.status(400).json({
        message: "Already following this user"
      });

    }

    currentUser.following.push(userToFollow._id);

    userToFollow.followers.push(currentUser._id);

    await currentUser.save();
    await userToFollow.save();

    res.json({ message: "User followed successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// UNFOLLOW USER

exports.unfollowUser = async (req, res) => {

  try {

    const userToUnfollow = await User.findById(req.params.id);

    const currentUser = await User.findById(req.user);

    currentUser.following = currentUser.following.filter(
      id => id.toString() !== userToUnfollow._id.toString()
    );

    userToUnfollow.followers = userToUnfollow.followers.filter(
      id => id.toString() !== currentUser._id.toString()
    );

    await currentUser.save();
    await userToUnfollow.save();

    res.json({ message: "User unfollowed successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


exports.getUserProfile = async (req, res) => {

  try {

    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("followers", "username")
      .populate("following", "username");

    res.json(user);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};