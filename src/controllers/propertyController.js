import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Fetch all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      include: {
        host: true,
        amenities: true,
      },
    });
    return res.status(200).json(properties);
  } catch (err) {
    console.error("Error fetching properties:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch a property by ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
      include: { host: true, amenities: true },
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    return res.status(200).json(property);
  } catch (err) {
    console.error("Error fetching property:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new property
export const createProperty = async (req, res) => {
  const { title, description, location, pricePerNight, maxGuestCount, hostId } =
    req.body;

  try {
    const hostExists = await prisma.user.findUnique({ where: { id: hostId } });
    if (!hostExists) {
      return res.status(404).json({ message: "Host not found" });
    }

    const newProperty = await prisma.property.create({
      data: {
        title,
        description,
        location,
        pricePerNight,
        maxGuestCount,
        hostId,
      },
    });

    return res.status(201).json(newProperty);
  } catch (err) {
    console.error("Error creating property:", err);
    res
      .status(500)
      .json({ message: "Failed to create property", error: err.message });
  }
};

// Delete a property
export const deleteProperty = async (req, res) => {
  try {
    await prisma.property.delete({ where: { id: req.params.id } });
    return res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    console.error("Error deleting property:", err);
    res.status(500).json({ message: "Server error" });
  }
};
