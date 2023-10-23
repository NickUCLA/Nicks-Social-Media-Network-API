const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createThought: async (req, res) => {
    try {
      const { thoughtText, username } = req.body;

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const thought = await Thought.create({
        thoughtText,
        username,
      });

      user.thoughts.push(thought);
      await user.save();

      res.status(201).json(thought);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }
      res.json(thought);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);

      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }

      await Thought.deleteOne({ _id: req.params.id });

      res.json({ message: "Thought removed successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
