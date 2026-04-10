const verifyToken = require("../../utils/verifyToken");

const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    const { decoded, error } = await verifyToken(req);

    if (error) {
      return res.status(error.status).json({ message: error.message });
    }

    if (!roles.includes(decoded.role)) {
      return res.status(403).json({
        message: "Access denied!"
      });
    }

    req.user = decoded;
    next();
  };
};

module.exports = authorizeRoles;