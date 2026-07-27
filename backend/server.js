import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🟢 ADD THIS ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Backend API is running successfully!");
});

// Aapka existing route
app.post("/api/watchlist/add", (req, res) => {
  res.json(req.body);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});