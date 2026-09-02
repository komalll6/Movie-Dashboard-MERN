import express from "express";
import {
  saveSearchQuery,
  getSearchHistory,
  clearSearchHistory,
} from "../controllers/searchController.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/save", protect, saveSearchQuery);
router.get("/", protect, getSearchHistory);
router.delete("/clear", protect, clearSearchHistory);

export default router;