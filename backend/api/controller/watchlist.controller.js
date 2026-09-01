//NEW- NOW
import Watchlist from "../model/watchlist.js";
import mongoose from "mongoose";

// Add to Watchlist
export const addToWatchlist = async (req, res) => {
  try {
    const rawUserId = req.user._id || req.user.id;
    if (!rawUserId) {
      return res.status(401).json({ success: false, message: "Unauthorized user" });
    }

    const userId = new mongoose.Types.ObjectId(rawUserId);
    const { mediaId, title, posterPath, mediaType, rating } = req.body;

    if (!mediaId || !title) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    let item = await Watchlist.findOne({ userId, mediaId: String(mediaId) });

    if (!item) {
      item = await Watchlist.create({
        userId,
        mediaId: String(mediaId),
        title,
        posterPath: posterPath || "",
        mediaType: mediaType || "movie",
        rating: Number(rating) || 0,
      });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("Add to Watchlist Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get User Watchlist
export const getWatchlist = async (req, res) => {
  try {
    const rawUserId = req.user._id || req.user.id;
    if (!rawUserId) {
      return res.status(401).json({ success: false, message: "Unauthorized user" });
    }

    const userId = new mongoose.Types.ObjectId(rawUserId);
    const items = await Watchlist.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("Get Watchlist Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Remove from Watchlist
export const removeFromWatchlist = async (req, res) => {
  try {
    const rawUserId = req.user._id || req.user.id;
    if (!rawUserId) {
      return res.status(401).json({ success: false, message: "Unauthorized user" });
    }

    const userId = new mongoose.Types.ObjectId(rawUserId);
    const { mediaId } = req.params;

    await Watchlist.findOneAndDelete({ userId, mediaId: String(mediaId) });

    return res
      .status(200)
      .json({ success: true, message: "Removed successfully from backend" });
  } catch (error) {
    console.error("Remove Watchlist Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};