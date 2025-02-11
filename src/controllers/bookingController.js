import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Controller to create a new booking
export const createBooking = async (req, res) => {
  const { userId, propertyId, startDate, endDate } = req.body;

  try {
    const newBooking = await prisma.booking.create({
      data: {
        userId,
        propertyId,
        startDate,
        endDate,
      },
    });
    res.status(201).json(newBooking); // Respond with the newly created booking
  } catch (error) {
    console.error("Error in creating booking:", error);
    res.status(500).json({ message: "Failed to create booking" });
  }
};

// Controller to get all bookings (with optional userId filter)
export const getAllBookings = async (req, res) => {
  const { userId } = req.query;

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: userId ? userId : undefined, // Filter by userId if provided
      },
    });

    return res.status(200).json(bookings); // Status 200 OK
  } catch (err) {
    console.error("Error in getAllBookings:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
