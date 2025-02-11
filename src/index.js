import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import logRequestDuration from "./middlewares/loggerMiddleware.js";
import globalErrorHandler from "./middlewares/errorMiddleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(logRequestDuration);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);

// Error Handling
app.use(globalErrorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
