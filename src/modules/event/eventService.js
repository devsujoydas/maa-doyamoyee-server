const Event = require("./eventModel");

const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../../../utils/uploadService");

// CREATE
const createEventService = async (userId, body, file) => {
  const { title, description, eventDate } = body;

  if (!title || !description || !eventDate) {
    throw new Error("REQUIRED_FIELDS_MISSING");
  }

  let image = { url: "", publicId: "" };

  if (file) {
    const result = await uploadImageToCloudinary(file.buffer, "events");
    image = result;
  }

  const event = await Event.create({
    title,
    description,
    eventDate,
    image,
    author: userId, // ✅ consistency
  });

  return event;
};

// GET ALL
const getEventsService = async (query) => {
  const { upcoming } = query;
  const filter = {};

  if (upcoming !== undefined) {
    filter.upcoming = upcoming === "true";
  }

  const events = await Event.find(filter)
    .populate("author", "name username profileImage")
    .sort({ eventDate: 1 });

  return {
    total: events.length,
    events,
  };
};

// GET ONE
const getEventService = async (id) => {
  const event = await Event.findById(id).populate(
    "author",
    "name username profileImage",
  );

  if (!event) throw new Error("EVENT_NOT_FOUND");

  return event;
};

// UPDATE
const updateEventService = async (user, id, body, file) => {
  const event = await Event.findById(id);
  if (!event) throw new Error("EVENT_NOT_FOUND");

  // 🔥 optional: only author বা admin update করতে পারবে
  if (!event.author.equals(user.id) && user.role !== "admin") {
    throw new Error("UNAUTHORIZED");
  }

  // text update
  if (body.title) event.title = body.title;
  if (body.description) event.description = body.description;
  if (body.eventDate) event.eventDate = body.eventDate;

  // image replace
  if (file) {
    if (event.image?.publicId) {
      await deleteImageFromCloudinary(event.image.publicId);
    }

    const result = await uploadImageToCloudinary(file.buffer, "events");

    event.image = result;
  }

  await event.save();

  return event;
};

// DELETE
const deleteEventService = async (user, id) => {
  const event = await Event.findById(id);
  if (!event) throw new Error("EVENT_NOT_FOUND");

  // 🔥 authorization
  if (!event.author.equals(user.id) && user.role !== "admin") {
    throw new Error("UNAUTHORIZED");
  }

  // delete image
  if (event.image?.publicId) {
    await deleteImageFromCloudinary(event.image.publicId);
  }

  await event.deleteOne();

  return { message: "Event deleted successfully" };
};

module.exports = {
  createEventService,
  getEventsService,
  getEventService,
  updateEventService,
  deleteEventService,
};
