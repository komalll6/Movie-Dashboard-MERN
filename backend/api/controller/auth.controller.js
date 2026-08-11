// const User = require("../model/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Signup Controller
// exports.signup = async (req, res) => {
//   try {
//     const { userName, email, password } = req.body;

//     if (!userName || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists with this email" });
//     }

//     // Hash Password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Save User
//     const newUser = new User({
//       userName,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//     });
//   } catch (error) {
//     console.error("Signup Error:", error);
//     res.status(500).json({ message: "Server error during registration" });
//   }
// };

// // Signin Controller
// exports.signin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Please provide email and password" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Generate JWT Token
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET || "default_secret_key",
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       success: true,
//       token,
//       data: {
//         id: user._id,
//         userName: user.userName,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("Signin Error:", error);
//     res.status(500).json({ message: "Server error during signin" });
//   }
// };
// import User from "../model/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // Signup Controller
// export const signup = async (req, res) => {
//   try {
//     const { userName, email, password } = req.body;

//     if (!userName || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists with this email" });
//     }

//     // Hash Password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Save User to Database
//     const newUser = await User.create({
//       userName,
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully!",
//       data: {
//         id: newUser._id,
//         userName: newUser.userName,
//         email: newUser.email,
//       },
//     });
//   } catch (error) {
//     console.error("Signup Error:", error);
//     res.status(500).json({ message: "Server error during registration", error: error.message });
//   }
// };

// // Signin Controller
// export const signin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Please provide both email and password" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Generate JWT Token
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET || "default_secret_key",
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login successful!",
//       token,
//       data: {
//         id: user._id,
//         userName: user.userName,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("Signin Error:", error);
//     res.status(500).json({ message: "Server error during signin", error: error.message });
//   }
// };


// import User from "../model/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // Signup Controller with Auto-Token Generation
// export const signup = async (req, res) => {
//   try {
//     const { userName, email, password } = req.body;

//     if (!userName || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists with this email" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await User.create({
//       userName,
//       email,
//       password: hashedPassword,
//     });

//     // 🚀 JWT Token Generate Karein (Auto-login ke liye)
//     const token = jwt.sign(
//       { id: newUser._id, email: newUser.email },
//       process.env.JWT_SECRET || "default_secret_key",
//       { expiresIn: "7d" }
//     );

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully!",
//       token, // 👈 Token Pass Ho Raha Hai
//       data: {
//         id: newUser._id,
//         userName: newUser.userName,
//         email: newUser.email,
//       },
//     });
//   } catch (error) {
//     console.error("Signup Error:", error);
//     res.status(500).json({ message: "Server error during registration", error: error.message });
//   }
// };

import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🚀 1. SIGN UP (Naya User)
export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Validation
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields (Username, Email, Password) are required!" });
    }

    // Check existing email
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "This email is already registered. Please Sign In." });
    }

    // Encrypt Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save to MongoDB
    const newUser = await User.create({
      userName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Generate JWT Token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET || "secretkey123",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      token,
      data: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup Controller Error:", error);
    res.status(500).json({ message: error.message || "Server Error during signup" });
  }
};

// 🚀 2. SIGN IN (Existing User)
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter Email and Password." });
    }

    // Find User in MongoDB
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password!" });
    }

    // Password Match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email or Password!" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secretkey123",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Signed in successfully!",
      token,
      data: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signin Controller Error:", error);
    res.status(500).json({ message: error.message || "Server Error during signin" });
  }
};