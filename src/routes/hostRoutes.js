import express from "express";
import { getAllHosts } from "../controllers/hostController.js";

const router = express.Router();

// Get all hosts (filtered by name query parameter)
router.get("/", getAllHosts);

export default router;
