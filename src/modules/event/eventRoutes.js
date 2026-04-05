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
 


router.post("/", createEvent); 
router.get("/", getEvents);
router.get("/:id", getEvent); 
router.put("/:id",isAdmin, updateEvent);
router.delete("/:id",isAdmin, deleteEvent);

module.exports = router;