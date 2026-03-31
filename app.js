const express = require("express");
const router = express.Router()
const authRoutes = require("./src/modules/auth/authRoutes");
const passRoutes = require("./src/modules/password/passRoutes");
const userRoutes = require("./src/modules/users/userRoutes");



router.use("/auth", authRoutes);
router.use("/password", passRoutes); 
router.use("/users", userRoutes);

module.exports = router