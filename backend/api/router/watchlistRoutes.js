import express from "express";
const router = express.Router();

router.post("/add", (req, res) => {
  res.json({ message: "Item added to watchlist", item: req.body });
});

export default router;