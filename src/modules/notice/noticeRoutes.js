const express = require("express");
const router = express.Router();

const isAdmin = require("../../middlewares/isAdmin");
const {
  getNotices,
  getNotice,
  createNotice,
  updateNotice,
  deleteNotice,
} = require("./noticeController");

// GET ALL + SEARCH + FILTER BY STATUS
router.get("/", getNotices);
router.get("/:id", getNotice);


router.post("/", isAdmin, createNotice);
router.put("/:id", isAdmin, updateNotice);
router.delete("/:id", isAdmin, deleteNotice);

module.exports = router;
