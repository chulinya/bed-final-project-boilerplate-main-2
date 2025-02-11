import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // Import bcrypt
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Login user (POST /login)
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.AUTH_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (err) {
    console.error("Error in loginUser:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all amenities (GET /amenities)
export const getAmenities = async (req, res) => {
  try {
    const amenities = await prisma.amenity.findMany();
    return res.status(200).json(amenities);
  } catch (err) {
    console.error("Error in getAmenities:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create an amenity (POST /amenities)
export const createAmenity = async (req, res) => {
  const { name, propertyId } = req.body;

  if (!name || !propertyId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newAmenity = await prisma.amenity.create({
      data: {
        name,
        propertyId,
      },
    });

    return res.status(201).json(newAmenity); // Successfully created amenity
  } catch (err) {
    console.error("Error in createAmenity:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
