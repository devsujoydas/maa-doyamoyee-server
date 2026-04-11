const jwt = require("jsonwebtoken");
const User = require("../src/modules/user/userModel");
const { JWT_SECRET } = require("../src/configs/config");

const verifyToken = async (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      error: { status: 401, message: "Unauthorized! No token provided." },
    };
  }

  try {
    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, JWT_SECRET);

    // 🔥 IMPORTANT: include role
    const user = await User.findById(decodedToken.id).select(
      "_id name email role"
    );

    if (!user) {
      return {
        error: { status: 404, message: "USER NOT FOUND" },
      };
    }

    return { decoded: user }; // return full user
  } catch (error) {
    return {
      error: { status: 403, message: "Invalid or expired token" },
    };
  } 
};

module.exports = verifyToken;