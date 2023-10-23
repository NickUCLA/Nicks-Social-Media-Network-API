const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .populate("thoughts")
        .populate("friends");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  addFriends: async (req, res) => {
    const userId = req.params.id;
    const { friends } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.friends.push(...friends);
      await user.save();

      res.status(200).json(user);
    } catch (error) {
      console.error("Error adding friends:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.thoughts.length > 0) {
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
      }

      await user.deleteOne({ _id: req.params.id });

      res.json({
        message: "User and associated thoughts removed successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  removeFriend: async (req, res) => {
    try {
      const { friendId } = req.params;
      const user = await User.findById(req.params.userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!user.friends.includes(friendId)) {
        return res
          .status(400)
          .json({ error: "Friend not found in user's friends list" });
      }

      user.friends = user.friends.filter(
        (friend) => friend.toString() !== friendId
      );
      await user.save();

      res.json({ message: "Friend removed successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
