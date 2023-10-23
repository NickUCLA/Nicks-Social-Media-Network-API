const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

// Define user-related routes using the userController functions
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.post("/users/:id/friends", userController.addFriends);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.delete("/users/:userId/friends/:friendId", userController.removeFriend);

module.exports = router;
