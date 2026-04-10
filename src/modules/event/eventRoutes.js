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
router.post("/", authorizeRoles("admin", "moderator"), upload.single("image"), createEvent);
// UPDATE
router.put("/:id", authorizeRoles("admin", "moderator"), upload.single("image"), updateEvent); 
// DELETE
router.delete("/:id", authorizeRoles("admin", "moderator"), deleteEvent);

module.exports = router;
