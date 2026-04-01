const express = require("express");
const router = express.Router();

const {
  createMessage,
  getMessages,
  updateMessage,
  deleteMessage,
  markRead,
  markUnread,
} = require("./messageController");
const isAdmin = require("../../middlewares/isAdmin");

// PUBLIC
router.post("/", createMessage);

// ADMIN
router.get("/", isAdmin, getMessages);

router.put("/:id", isAdmin, updateMessage);
router.delete("/:id", isAdmin, deleteMessage);

router.patch("/:id/read", isAdmin, markRead);
router.patch("/:id/unread", isAdmin, markUnread);

module.exports = router;
