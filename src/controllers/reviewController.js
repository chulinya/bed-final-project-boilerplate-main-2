import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany();
    return res.json(reviews);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching reviews" });
  }
};

export const createReview = async (req, res) => {
  const { userId, propertyId, rating, comment } = req.body;

  try {
    const review = await prisma.review.create({
      data: {
        userId,
        propertyId,
        rating,
        comment,
      },
    });
    return res.json(review);
  } catch (error) {
    return res.status(500).json({ message: "Error creating review" });
  }
};
