import express from "express";
import { getReviews, createReview } from "../controllers/reviewController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getReviews);
router.post("/", authMiddleware, createReview);

export default router;
