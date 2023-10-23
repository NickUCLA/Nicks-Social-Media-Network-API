const express = require("express");
const router = express.Router();
const thoughtController = require("../../controllers/thoughtController");

// Define thought-related routes using the thoughtController functions
router.get("/thoughts", thoughtController.getAllThoughts);
router.get("/thoughts/:id", thoughtController.getThoughtById);
router.post("/users/:userId/thoughts", thoughtController.createThought);
router.put("/thoughts/:id", thoughtController.updateThought);
router.delete("/thoughts/:id", thoughtController.deleteThought);

module.exports = router;
