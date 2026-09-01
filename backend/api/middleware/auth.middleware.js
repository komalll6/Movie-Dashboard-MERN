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