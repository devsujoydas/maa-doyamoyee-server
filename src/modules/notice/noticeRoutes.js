const express = require("express");
const router = express.Router();
const isAdmin = require("../../middlewares/isAdmin");
const {
  getNotices,
  getNotice,
  createNotice,
  updateNotice,
  deleteNotice,
  togglePin,
  toggleStatus,
} = require("./noticeController");

router.get("/", getNotices);
router.get("/:id", getNotice);
router.post("/", isAdmin, createNotice);
router.put("/:id", isAdmin, updateNotice);
router.delete("/:id", isAdmin, deleteNotice);
router.patch("/:id/toggle-pin", isAdmin, togglePin);
router.patch("/:id/toggle-status", isAdmin, toggleStatus);

module.exports = router;