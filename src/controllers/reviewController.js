import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany();
    return res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createReview = async (req, res) => {
  const { userId, propertyId, rating, comment } = req.body;

  try {
    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) return res.status(404).json({ message: "User not found" });

    const propertyExists = await prisma.property.findUnique({
      where: { id: propertyId },
    });
    if (!propertyExists)
      return res.status(404).json({ message: "Property not found" });

    const review = await prisma.review.create({
      data: { userId, propertyId, rating, comment },
    });

    return res.status(201).json(review);
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ message: "Server error" });
  }
};
