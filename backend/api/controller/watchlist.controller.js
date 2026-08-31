// import Watchlist from "../model/Watchlist.js";

// // 1. Add item to Watchlist
// export const addToWatchlist = async (req, res) => {
//   try {
//     const { mediaId, title, posterPath, mediaType, rating } = req.body;
    
//     // Safely extract User ID from JWT Payload
//     const userId = req.user?._id || req.user?.id;

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "User identity not found in token." });
//     }

//     // Check if already in watchlist
//     const exists = await Watchlist.findOne({ userId, mediaId: String(mediaId) });
//     if (exists) {
//       return res.status(200).json({
//         success: true,
//         message: "Item is already in your watchlist!",
//         data: exists,
//       });
//     }

//     const newItem = await Watchlist.create({
//       userId,
//       mediaId: String(mediaId),
//       title: title || "Untitled",
//       posterPath: posterPath || "",
//       mediaType: mediaType || "movie",
//       rating: rating || 0,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Added to Watchlist successfully!",
//       data: newItem,
//     });
//   } catch (error) {
//     console.error("Error in addToWatchlist:", error);
//     return res.status(500).json({ success: false, message: error.message || "Failed to add to watchlist" });
//   }
// };

// // 2. Get User's Watchlist
// export const getWatchlist = async (req, res) => {
//   try {
//     const userId = req.user?._id || req.user?.id;
//     const list = await Watchlist.find({ userId }).sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       count: list.length,
//       data: list,
//     });
//   } catch (error) {
//     console.error("Error in getWatchlist:", error);
//     return res.status(500).json({ success: false, message: error.message || "Failed to fetch watchlist" });
//   }
// };

// // 3. Remove item from Watchlist
// export const removeFromWatchlist = async (req, res) => {
//   try {
//     const { mediaId } = req.params;
//     const userId = req.user?._id || req.user?.id;

//     await Watchlist.findOneAndDelete({ userId, mediaId: String(mediaId) });

//     return res.status(200).json({
//       success: true,
//       message: "Removed from Watchlist successfully!",
//     });
//   } catch (error) {
//     console.error("Error in removeFromWatchlist:", error);
//     return res.status(500).json({ success: false, message: error.message || "Failed to remove item" });
//   }
// };


// import Watchlist from "../model/Watchlist.js";

// // Add to Watchlist
// export const addToWatchlist = async (req, res) => {
//   try {
//     const userId = req.user._id || req.user.id;
//     const { mediaId, title, posterPath, mediaType, rating } = req.body;

//     let item = await Watchlist.findOne({ userId, mediaId });
//     if (!item) {
//       item = await Watchlist.create({
//         userId,
//         mediaId,
//         title,
//         posterPath,
//         mediaType,
//         rating,
//       });
//     }

//     res.status(200).json({ success: true, data: item });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get User Watchlist
// export const getWatchlist = async (req, res) => {
//   try {
//     const userId = req.user._id || req.user.id;
//     const items = await Watchlist.find({ userId });
//     res.status(200).json({ success: true, data: items });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Remove from Watchlist
// export const removeFromWatchlist = async (req, res) => {
//   try {
//     const userId = req.user._id || req.user.id;
//     const { mediaId } = req.params;

//     await Watchlist.findOneAndDelete({ userId, mediaId });
//     res.status(200).json({ success: true, message: "Removed successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


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