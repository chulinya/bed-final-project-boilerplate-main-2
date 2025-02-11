import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Middleware setup
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(cors());
app.use(express.json()); // This is essential for parsing JSON request bodies

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Booking API!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
