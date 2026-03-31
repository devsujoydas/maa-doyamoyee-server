const express = require("express");
const router = express.Router()
const authRoutes = require("./src/modules/auth/authRoutes");
const passRoutes = require("./src/modules/password/passRoutes");
const userRoutes = require("./src/modules/users/userRoutes");
const postRoutes = require("./src/modules/posts/postRoutes"); 
const adminRoutes = require("./src/modules/admin/adminRoutes");




router.use("/auth", authRoutes);
router.use("/password", passRoutes); 
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/admin", adminRoutes);
 

module.exports = router