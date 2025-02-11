import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  deleteProperty,
} from "../controllers/propertyController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.post("/", authMiddleware, createProperty);
router.delete("/:id", authMiddleware, deleteProperty);

export default router;
