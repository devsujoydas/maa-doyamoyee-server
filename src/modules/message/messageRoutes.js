const express = require("express");
const router = express.Router();
const isAdmin = require("../../middlewares/isAdmin");

const {
  createMessage,
  getMessages,
  deleteMessage,
  markRead,
  markUnread,
  sendReply,
} = require("./messageController");

// PUBLIC
router.post("/", createMessage);

// ADMIN
router.get("/", isAdmin, getMessages);
router.delete("/:id", isAdmin, deleteMessage);

router.patch("/:id/read", isAdmin, markRead);
router.patch("/:id/unread", isAdmin, markUnread);

router.post("/:id/reply", isAdmin, sendReply);

module.exports = router;