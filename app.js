const express = require("express");
const router = express.Router()
const authRoutes = require("./src/modules/auth/authRoutes");
const passRoutes = require("./src/modules/password/passRoutes");
const userRoutes = require("./src/modules/user/userRoutes");
const postRoutes = require("./src/modules/post/postRoutes"); 
const adminRoutes = require("./src/modules/admin/adminRoutes");
const noticeRoutes = require("./src/modules/notice/noticeRoutes");
const eventRoutes = require("./src/modules/event/eventRoutes");
const messageRoutes = require("./src/modules/message/messageRoutes");

const donationRoutes = require("./src/modules/donation/donationRoutes");
const galleryRoutes = require("./src/modules/gallery/galleryRoutes");



router.use("/gallery", galleryRoutes);

router.use("/auth", authRoutes);
router.use("/password", passRoutes); 
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/admin", adminRoutes);
router.use("/notices", noticeRoutes);
router.use("/events", eventRoutes);
router.use("/messages", messageRoutes);

router.use("/donation", donationRoutes);
 

module.exports = router