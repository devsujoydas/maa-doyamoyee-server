const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("./eventController");
const isAdmin = require("../../middlewares/isAdmin");
const upload = require("../../../utils/multer");

// CREATE
router.post("/", isAdmin, upload.single("image"), createEvent);

// READ
router.get("/", getEvents);
router.get("/:id", getEvent);

// UPDATE
router.put("/:id", isAdmin, upload.single("image"), updateEvent);

// DELETE
router.delete("/:id", isAdmin, deleteEvent);

module.exports = router;
