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
router.post("/", authorizeRoles("admin"), createNotice);
router.put("/:id", authorizeRoles("admin"), updateNotice);
router.delete("/:id", authorizeRoles("admin"), deleteNotice);
router.patch("/:id/toggle-pin", authorizeRoles("admin"), togglePin);
router.patch("/:id/toggle-status", authorizeRoles("admin"), toggleStatus);

module.exports = router;