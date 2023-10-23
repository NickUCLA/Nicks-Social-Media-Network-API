const User = require("../models/User");

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
      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
        // User not found
        return res.status(404).json({ error: "User not found" });
      }

      // Add friends to the user's friends list
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

      // Remove user's associated thoughts
      await user.populate("thoughts").execPopulate();
      const thoughtIds = user.thoughts.map((thought) => thought._id);
      await Thought.deleteMany({ _id: { $in: thoughtIds } });

      // Remove the user
      await user.remove();

      res.json({
        message: "User and associated thoughts removed successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
