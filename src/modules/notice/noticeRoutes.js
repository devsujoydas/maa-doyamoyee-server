const express = require("express");
const router = express.Router();

const {
  getNotices,
  getNotice,
  createNotice,
  updateNotice,
  deleteNotice,
  togglePin,
  toggleStatus,
} = require("./noticeController");
const authorizeRoles = require("../../middlewares/authorizeRoles");

router.get("/", getNotices);
router.get("/:id", getNotice);
router.post("/", authorizeRoles("ceo"), createNotice);
router.put("/:id", authorizeRoles("ceo"), updateNotice);
router.delete("/:id", authorizeRoles("ceo"), deleteNotice);
router.patch("/:id/toggle-pin", authorizeRoles("ceo"), togglePin);
router.patch("/:id/toggle-status", authorizeRoles("ceo"), toggleStatus);

module.exports = router;