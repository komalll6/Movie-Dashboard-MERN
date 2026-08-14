import Watchlist from "../model/Watchlist.js";

// 1. Add item to Watchlist
export const addToWatchlist = async (req, res) => {
  try {
    const { mediaId, title, posterPath, mediaType, rating } = req.body;
    const userId = req.user.id; // Authentication middleware se aayega

    // Check if already in watchlist
    const exists = await Watchlist.findOne({ userId, mediaId });
    if (exists) {
      return res.status(400).json({ message: "Item is already in your watchlist!" });
    }

    const newItem = await Watchlist.create({
      userId,
      mediaId,
      title,
      posterPath,
      mediaType,
      rating,
    });

    res.status(201).json({
      success: true,
      message: "Added to Watchlist successfully!",
      data: newItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to add to watchlist" });
  }
};

// 2. Get User's Watchlist
export const getWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const list = await Watchlist.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: list.length,
      data: list,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch watchlist" });
  }
};

// 3. Remove item from Watchlist
export const removeFromWatchlist = async (req, res) => {
  try {
    const { mediaId } = req.params;
    const userId = req.user.id;

    await Watchlist.findOneAndDelete({ userId, mediaId });

    res.status(200).json({
      success: true,
      message: "Removed from Watchlist successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to remove item" });
  }
};