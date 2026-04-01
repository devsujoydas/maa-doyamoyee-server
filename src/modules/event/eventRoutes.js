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

// CREATE
router.post("/", createEvent);

// GET ALL (optional ?upcoming=true/false)
router.get("/", getEvents);

// GET SINGLE
router.get("/:id", getEvent);

// UPDATE
router.put("/:id",isAdmin, updateEvent);

// DELETE
router.delete("/:id",isAdmin, deleteEvent);

module.exports = router;