const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("./eventController");
const upload = require("../../../utils/multer");
const authorizeRoles = require("../../middlewares/authorizeRoles");


// READ
router.get("/", getEvents);
router.get("/:id", getEvent);

// CREATE
router.post("/", authorizeRoles("admin", "ceo"), upload.single("image"), createEvent);
// UPDATE
router.put("/:id", authorizeRoles("admin", "ceo"), upload.single("image"), updateEvent); 
// DELETE
router.delete("/:id", authorizeRoles("admin", "ceo"), deleteEvent);

module.exports = router;
