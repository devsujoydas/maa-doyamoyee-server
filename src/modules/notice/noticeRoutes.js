const express = require("express");
const router = express.Router();

const {
  getNotices,
  getNotice,
  createNotice,
  updateNotice,
  deleteNotice,
} = require("./noticeController");
const isAdmin = require("../../middlewares/isAdmin");

// GET
router.get("/", getNotices);
router.get("/:id", getNotice);

// CREATE
router.post("/", isAdmin, createNotice);

// UPDATE
router.put("/:id", isAdmin, updateNotice);

// DELETE
router.delete("/:id", isAdmin, deleteNotice);

module.exports = router;
