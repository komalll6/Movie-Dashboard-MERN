import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mediaId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    posterPath: {
      type: String,
      default: "",
    },
    mediaType: {
      type: String, // 'movie', 'tv', ya 'anime'
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Prevent duplicate items for the same user
watchlistSchema.index({ userId: 1, mediaId: 1 }, { unique: true });

export default mongoose.model("Watchlist", watchlistSchema);