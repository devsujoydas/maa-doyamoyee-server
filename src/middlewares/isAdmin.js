const verifyToken = require("../../utils/verifyToken");

const isAdmin = async (req, res, next) => {
  const { decoded, error } = await verifyToken(req);

  if (error) {
    return res.status(error.status).json({ message: error.message });
  }

  // 🔥 SAFE CHECK
  if (decoded.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied! Admin only." });
  }

  req.user = decoded;
  next();
};

module.exports = isAdmin;