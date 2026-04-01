const Message = require("./messageModel");

// CREATE
const createMessageService = async (req) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    throw new Error("REQUIRED_FIELDS_MISSING");
  }

  const newMessage = await Message.create(req.body);
  return newMessage;
};

// GET ALL
const getMessagesService = async (req) => {
  const messages = await Message.find().sort({ createdAt: -1 });

  return {
    total: messages.length,
    messages,
  };
};

// UPDATE (optional edit)
const updateMessageService = async (req) => {
  const msg = await Message.findById(req.params.id);
  if (!msg) throw new Error("MESSAGE_NOT_FOUND");

  Object.assign(msg, req.body);
  await msg.save();

  return msg;
};

// DELETE
const deleteMessageService = async (req) => {
  const msg = await Message.findById(req.params.id);
  if (!msg) throw new Error("MESSAGE_NOT_FOUND");

  await Message.findByIdAndDelete(req.params.id);

  return { message: "Message deleted successfully" };
};

// MARK READ
const markReadService = async (req) => {
  const msg = await Message.findById(req.params.id);
  if (!msg) throw new Error("MESSAGE_NOT_FOUND");

  msg.isRead = true;
  await msg.save();

  return msg;
};

// MARK UNREAD
const markUnreadService = async (req) => {
  const msg = await Message.findById(req.params.id);
  if (!msg) throw new Error("MESSAGE_NOT_FOUND");

  msg.isRead = false;
  await msg.save();

  return msg;
};

module.exports = {
  createMessageService,
  getMessagesService,
  updateMessageService,
  deleteMessageService,
  markReadService,
  markUnreadService,
};