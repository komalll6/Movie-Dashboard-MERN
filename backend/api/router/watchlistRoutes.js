//NEW -  NOW
import express from "express";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../controller/watchlist.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/add", addToWatchlist);
router.get("/", getWatchlist);
router.delete("/remove/:mediaId", removeFromWatchlist);

export default router;