import SearchHistory from "../models/SearchHistory.js";

// Save a new search query
export const saveSearchQuery = async (req, res) => {
  try {
    const { query } = req.body;
    const userId = req.user.id || req.user._id;

    if (!query || !query.trim()) {
      return res.status(400).json({ success: false, message: "Query is required" });
    }

    const cleanQuery = query.trim();

    // Pehle se same search term hai toh duplicate purana wala uda do
    await SearchHistory.deleteMany({ userId, query: cleanQuery });

    // Save latest query
    const newSearch = await SearchHistory.create({
      userId,
      query: cleanQuery,
    });

    res.status(201).json({ success: true, data: newSearch });
  } catch (error) {
    console.error("Save Search Error:", error);
    res.status(500).json({ success: false, message: "Server error saving search" });
  }
};

// Get user's search history (Latest 10)
export const getSearchHistory = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const history = await SearchHistory.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({ success: true, data: history });
  } catch (error) {
    console.error("Get Search Error:", error);
    res.status(500).json({ success: false, message: "Server error fetching history" });
  }
};

// Clear all search history
export const clearSearchHistory = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    await SearchHistory.deleteMany({ userId });

    res.status(200).json({ success: true, message: "Search history cleared" });
  } catch (error) {
    console.error("Clear Search Error:", error);
    res.status(500).json({ success: false, message: "Server error clearing history" });
  }
};