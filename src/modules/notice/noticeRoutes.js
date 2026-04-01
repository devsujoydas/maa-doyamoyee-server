const express = require("express");
const router = express.Router();

const {
  getNotices,
  getNotice,
  createNotice,
  updateNotice,
  deleteNotice,
  updateNoticeStatus,
  togglePinned,
  toggleImportant,
} = require("./noticeController");
const isAdmin = require("../../middlewares/isAdmin");

// GET ALL + SEARCH + STATUS
router.get("/", getNotices);

// GET SINGLE
router.get("/:id", getNotice);

// CREATE
router.post("/", isAdmin, createNotice);

// UPDATE
router.put("/:id", isAdmin, updateNotice);

// DELETE
router.delete("/:id", isAdmin, deleteNotice);

// STATUS UPDATE
router.patch("/:id/status", isAdmin, updateNoticeStatus);

// PINNED TOGGLE
router.patch("/:id/toggle-pin", isAdmin, togglePinned);

// IMPORTANT TOGGLE
router.patch("/:id/toggle-important", isAdmin, toggleImportant);

module.exports = router;
