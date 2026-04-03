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


// CRUD
router.post("/", createNotice);
router.put("/:id",  updateNotice);
router.delete("/:id", deleteNotice);




module.exports = router;