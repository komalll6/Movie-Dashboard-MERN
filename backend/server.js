// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// // 1. Initialize dotenv immediately!
// dotenv.config();

// import authRoutes from "./api/router/authRoutes.js";
// import watchlistRoutes from "./api/router/watchlistRoutes.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// // 2. DB Connection (process.env.MONGO_URI is now loaded properly)
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Atlas Connected Successfully"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));

// // Routes
// app.get("/", (req, res) => {
//   res.send("Backend API is running successfully!");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/watchlist", watchlistRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";

// // Initialize dotenv
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// import authRoutes from "./api/router/authRoutes.js";
// import watchlistRoutes from "./api/router/watchlistRoutes.js";

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // API Routes
// app.get("/", (req, res) => {
//   res.send("Backend API is running successfully!");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/watchlist", watchlistRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";

// import authRoutes from "./api/router/authRoutes.js";
// import watchlistRoutes from "./api/router/watchlistRoutes.js";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // DB Connection
// connectDB();

// // Routes
// app.get("/", (req, res) => {
//   res.send("Backend API is running successfully!");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/watchlist", watchlistRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./api/router/authRoutes.js";
import watchlistRoutes from "./api/router/watchlistRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("Backend API is running successfully!");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);

// Server Listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});