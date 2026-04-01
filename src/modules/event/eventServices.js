const Event = require("./eventModel");

// CREATE EVENT
const createEventService = async (req) => {
  const { title, description, eventDate } = req.body;

  if (!title || !description || !eventDate) {
    throw new Error("REQUIRED_FIELDS_MISSING");
  }

  const event = await Event.create(req.body);
  return event;
};

// GET ALL EVENTS (optional filter: upcoming)
const getEventsService = async (req) => {
  const { upcoming } = req.query;
  const filter = {};

  if (upcoming !== undefined) {
    filter.upcoming = upcoming === "true";
  }

  const events = await Event.find(filter).sort({
    eventDate: 1, // nearest event first
  });

  return {
    total: events.length,
    events,
  };
};

// GET SINGLE EVENT
const getEventService = async (req) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw new Error("EVENT_NOT_FOUND");

  return event;
};

// UPDATE EVENT
const updateEventService = async (req) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw new Error("EVENT_NOT_FOUND");

  Object.assign(event, req.body);
  await event.save(); // pre-save hook will handle slug + upcoming

  return event;
};

// DELETE EVENT
const deleteEventService = async (req) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw new Error("EVENT_NOT_FOUND");

  await Event.findByIdAndDelete(req.params.id);

  return { message: "Event deleted successfully" };
};

module.exports = {
  createEventService,
  getEventsService,
  getEventService,
  updateEventService,
  deleteEventService,
};