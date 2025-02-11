import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"; // Ensure auth middleware is imported

const router = express.Router();

// POST route for creating a user
router.post("/", createUser); // Ensure createUser is properly defined in the controller

// PUT route for updating a user (protected route)
router.put("/:id", authMiddleware, updateUser); // Ensure updateUser is properly defined in the controller

// DELETE route for deleting a user (protected route)
router.delete("/:id", authMiddleware, deleteUser); // Ensure deleteUser is properly defined in the controller

export default router;
