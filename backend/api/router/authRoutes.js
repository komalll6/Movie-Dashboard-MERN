import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Updated path to reference model/ inside the api/ folder
import User from "../model/User.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ userName, email, password: hashedPassword });

    res.status(201).json({ message: "User created successfully!", data: { id: user._id, userName: user.userName, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error during registration", error: err.message });
  }
});

// SIGNIN
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      message: "Login successful!",
      token,
      data: { id: user._id, userName: user.userName, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error during signin", error: err.message });
  }
});

export default router;
