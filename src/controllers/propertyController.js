import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Fetch all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      include: {
        host: true, // Include host details
        amenities: true, // Include amenities
      },
    });
    return res.status(200).json(properties);
  } catch (err) {
    console.error("Error in getAllProperties:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Fetch a single property by ID
export const getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        host: true, // Include host details
        amenities: true, // Include amenities
      },
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    return res.status(200).json(property);
  } catch (err) {
    console.error("Error in getPropertyById:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create a new property
export const createProperty = async (req, res) => {
  const { title, description, location, pricePerNight, hostId } = req.body;

  // Check if hostId exists
  const host = await prisma.user.findUnique({
    where: { id: hostId },
  });

  if (!host) {
    return res.status(404).json({ message: "Host not found" });
  }

  try {
    const newProperty = await prisma.property.create({
      data: {
        title,
        description,
        location,
        pricePerNight,
        hostId, // Ensure hostId exists
      },
    });

    return res.status(201).json(newProperty);
  } catch (err) {
    console.error("Error in createProperty:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update a property
export const updateProperty = async (req, res) => {
  const { id } = req.params;
  const { title, description, location, pricePerNight, hostId } = req.body;

  // Check if hostId exists
  if (hostId) {
    const host = await prisma.user.findUnique({
      where: { id: hostId },
    });

    if (!host) {
      return res.status(404).json({ message: "Host not found" });
    }
  }

  try {
    const updatedProperty = await prisma.property.update({
      where: { id },
      data: {
        title,
        description,
        location,
        pricePerNight,
        hostId, // Ensure hostId exists
      },
    });

    return res.status(200).json(updatedProperty);
  } catch (err) {
    console.error("Error in updateProperty:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a property
export const deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProperty = await prisma.property.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Property deleted successfully",
      property: deletedProperty,
    });
  } catch (err) {
    console.error("Error in deleteProperty:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
