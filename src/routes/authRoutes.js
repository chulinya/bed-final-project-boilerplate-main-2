import express from "express";
import { loginUser } from "../controllers/authController.js"; // Ensure this controller exists

const router = express.Router();

// POST /api/auth/login - Login Route
router.post("/login", loginUser);

export default router;
