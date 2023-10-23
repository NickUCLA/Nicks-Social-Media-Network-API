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
      const { thoughtText } = req.body;
      const { userId } = req.params;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const thought = await Thought.create({
        thoughtText,
        username: user.username,
      });

      user.thoughts.push(thought);
      await user.save();

      res.status(201).json(thought);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  addReaction: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;

      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        {
          $push: {
            reactions: { reactionBody, username },
          },
        },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ error: "Thought not found" });
      }

      res.status(201).json(updatedThought);
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

      const user = await User.findOne({ username: thought.username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.thoughts = user.thoughts.filter(
        (thoughtId) => thoughtId.toString() !== req.params.id
      );
      await user.save();

      await Thought.deleteOne({ _id: req.params.id });

      res.json({ message: "Thought removed successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  removeReaction: async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;

      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        {
          $pull: {
            reactions: { reactionId: reactionId },
          },
        },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ error: "Thought not found" });
      }

      res.json(updatedThought);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
