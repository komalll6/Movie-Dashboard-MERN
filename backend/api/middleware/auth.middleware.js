// import jwt from "jsonwebtoken";

// export const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       // Decode token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Save user ID so watchlist controller gets it properly
//       req.user = {
//         _id: decoded.id || decoded._id || decoded.userId,
//         id: decoded.id || decoded._id || decoded.userId,
//       };

//       return next();
//     } catch (error) {
//       console.error("JWT Error:", error.message);
//       return res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }
// };


//NOW- NEW
// import jwt from "jsonwebtoken";

// export const protect = async (req, res, next) => {
//   let token;

//   const authHeader = req.headers.authorization || req.headers.Authorization;

//   if (authHeader && authHeader.startsWith("Bearer")) {
//     try {
//       token = authHeader.split(" ")[1]?.trim();

//       // Clean token string if it wrapped with quotes
//       token = token.replace(/^"(.*)"$/, "$1");

//       if (!token || token === "null" || token === "undefined") {
//         return res
//           .status(401)
//           .json({ success: false, message: "Token missing or null" });
//       }

//       // Verify token using JWT_SECRET or fallback
//       const secret = process.env.JWT_SECRET || "your_jwt_secret";
//       const decoded = jwt.verify(token, secret);

//       const userId = decoded.id || decoded._id || decoded.userId;

//       if (!userId) {
//         return res
//           .status(401)
//           .json({ success: false, message: "Invalid token payload structure" });
//       }

//       req.user = {
//         _id: String(userId),
//         id: String(userId),
//       };

//       return next();
//     } catch (error) {
//       console.error("JWT Verification Error:", error.message);
//       return res.status(401).json({
//         success: false,
//         message: "Not authorized, token invalid or expired",
//       });
//     }
//   }

//   return res
//     .status(401)
//     .json({ success: false, message: "Not authorized, no token provided" });
// };


import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      // Token string se 'Bearer ' space aur extra quotes saaf karein
      token = authHeader.split(" ")[1];

      if (token) {
        token = token.replace(/^"(.*)"$/, "$1").trim();
      }

      // ✅ FIX: Same secret key as authcontroller.js ("secretkey123")
      const secret = process.env.JWT_SECRET || "secretkey123";

      const decoded = jwt.verify(token, secret);

      req.user = decoded;
      return next();
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      return res.status(401).json({
        success: false,
        message: "Not authorized, token invalid or expired",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token provided",
    });
  }
};