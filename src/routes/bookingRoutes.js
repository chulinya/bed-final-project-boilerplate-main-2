import express from "express";
import { createBooking } from "../controllers/bookingController.js"; // Ensure controller functions are defined

const router = express.Router();

// POST route for creating a booking
router.post("/", createBooking); // Ensure createBooking is defined in the controller

export default router;
