import express from "express";
import { loginUser } from "../controllers/loginUser.js"; // Import the loginUser function

const router = express.Router();

// POST route for login
router.post("/login", loginUser); // Ensure loginUser is defined in the controller

export default router;
