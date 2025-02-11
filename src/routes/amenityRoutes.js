import express from "express";
import {
  getAmenities,
  createAmenity,
} from "../controllers/amenityController.js";

const router = express.Router();

router.get("/amenities", getAmenities);
router.post("/amenities", createAmenity);

export default router;
