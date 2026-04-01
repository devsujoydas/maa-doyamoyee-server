const {
  createEventService,
  getEventsService,
  getEventService,
  updateEventService,
  deleteEventService,
} = require("./eventServices");

// CREATE
const createEvent = async (req, res) => {
  try {
    const event = await createEventService(req);
    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (err) {
    if (err.message === "REQUIRED_FIELDS_MISSING") {
      return res.status(400).json({ message: "Title, description & eventDate required" });
    }
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
const getEvents = async (req, res) => {
  try {
    const data = await getEventsService(req);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getEvent = async (req, res) => {
  try {
    const event = await getEventService(req);
    res.status(200).json(event);
  } catch (err) {
    if (err.message === "EVENT_NOT_FOUND") {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateEvent = async (req, res) => {
  try {
    const event = await updateEventService(req);
    res.status(200).json({
      message: "Event updated successfully",
      event,
    });
  } catch (err) {
    if (err.message === "EVENT_NOT_FOUND") {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteEvent = async (req, res) => {
  try {
    const result = await deleteEventService(req);
    res.status(200).json(result);
  } catch (err) {
    if (err.message === "EVENT_NOT_FOUND") {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};