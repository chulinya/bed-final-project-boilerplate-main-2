import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// GET all properties
router.get("/", async (req, res) => {
  try {
    const properties = await prisma.property.findMany();
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch properties" });
  }
});

// POST create a property
router.post("/", async (req, res) => {
  const {
    title,
    description,
    location,
    pricePerNight,
    maxGuestCount,
    hostId,
    userId,
  } = req.body;

  try {
    const newProperty = await prisma.property.create({
      data: {
        title,
        description,
        location,
        pricePerNight,
        maxGuestCount,
        hostId,
        userId,
      },
    });
    res.status(201).json(newProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create property" });
  }
});

// PUT update a property by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    location,
    pricePerNight,
    maxGuestCount,
    hostId,
    userId,
  } = req.body;

  try {
    const updatedProperty = await prisma.property.update({
      where: { id },
      data: {
        title,
        description,
        location,
        pricePerNight,
        maxGuestCount,
        hostId,
        userId,
      },
    });
    res.json(updatedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update property" });
  }
});

// DELETE a property by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.property.delete({
      where: { id },
    });
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete property" });
  }
});

export default router;
