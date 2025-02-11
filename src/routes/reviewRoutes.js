import express from "express";
import { getReviews, createReview } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/reviews", getReviews);
router.post("/reviews", createReview);

export default router;
