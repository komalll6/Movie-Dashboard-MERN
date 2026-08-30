import express from "express";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../controller/watchlist.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes are protected by JWT Auth
router.post("/add", protect, addToWatchlist);
router.get("/", protect, getWatchlist);
router.delete("/remove/:mediaId", protect, removeFromWatchlist);

export default router;
