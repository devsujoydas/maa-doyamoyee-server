const {
  createEventService,
  getEventsService,
  getEventService,
  updateEventService,
  deleteEventService,
} = require("./eventService");

// CREATE
const createEvent = async (req, res) => {
  try {
    const data = await createEventService(req.user.id, req.body, req.file);

    res.status(201).json({
      message: "Event created successfully",
      event: data,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET ALL
const getEvents = async (req, res) => {
  try {
    const data = await getEventsService(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
const getEvent = async (req, res) => {
  try {
    const data = await getEventService(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE
const updateEvent = async (req, res) => {
  
  try {
    const data = await updateEventService(
      req.user,
      req.params.id,
      req.body,
      req.file,
    );

    res.json({
      message: "Event updated successfully",
      event: data,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
const deleteEvent = async (req, res) => {
  try {
    const data = await deleteEventService(req.user, req.params.id);

    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
