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
router.get("/", authorizeRoles("admin", "moderator"), getMessages);
router.delete("/:id", authorizeRoles("admin", "moderator"), deleteMessage);

router.patch("/:id/read", authorizeRoles("admin", "moderator"), markRead);
router.patch("/:id/unread", authorizeRoles("admin", "moderator"), markUnread);

router.post("/:id/reply", authorizeRoles("admin", "moderator"), sendReply);

module.exports = router;