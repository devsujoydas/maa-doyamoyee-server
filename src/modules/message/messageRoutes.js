const express = require("express");
const router = express.Router();
const isAdmin = require("../../middlewares/isAdmin");

const {
  createMessage,
  getMessages,
  updateMessage,
  deleteMessage,
  markRead,
  markUnread,
} = require("./messageController");

// PUBLIC
router.post("/", createMessage);

// ADMIN ONLY
router.get("/", isAdmin, getMessages);
router.put("/:id", isAdmin, updateMessage);
router.delete("/:id", isAdmin, deleteMessage);

// MARK READ / UNREAD
router.patch("/:id/read", isAdmin, markRead);
router.patch("/:id/unread", isAdmin, markUnread);

module.exports = router;