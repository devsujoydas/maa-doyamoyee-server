const express = require("express");
const router = express.Router();

const {
  createMessage,
  getMessages,
  deleteMessage,
  markRead,
  markUnread,
  sendReply,
} = require("./messageController");
const authorizeRoles = require("../../middlewares/authorizeRoles");

// PUBLIC
router.post("/", createMessage);

// ADMIN
router.get("/", authorizeRoles("admin", "ceo"), getMessages);
router.delete("/:id", authorizeRoles("admin", "ceo"), deleteMessage);

router.patch("/:id/read", authorizeRoles("admin", "ceo"), markRead);
router.patch("/:id/unread", authorizeRoles("admin", "ceo"), markUnread);

router.post("/:id/reply", authorizeRoles("admin", "ceo"), sendReply);

module.exports = router;