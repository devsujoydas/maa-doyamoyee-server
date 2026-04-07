const Message = require("./messageModel");

// CREATE MESSAGE
const createMessageService = async (data) => {
  const { name, email, message } = data;

  if (!name || !email || !message) {
    throw new Error("REQUIRED_FIELDS_MISSING");
  }

  const newMessage = await Message.create(data);
  return newMessage;
};

// GET ALL MESSAGES
const getMessagesService = async () => {
  const messages = await Message.find().sort({ createdAt: -1 });
  return { total: messages.length, messages };
};

// UPDATE MESSAGE
const updateMessageService = async (id, data) => {
  const msg = await Message.findById(id);
  if (!msg) throw new Error("MESSAGE_NOT_FOUND");

  Object.assign(msg, data);
  await msg.save();

  return msg;
};

// DELETE MESSAGE
const deleteMessageService = async (id) => {
  const msg = await Message.findByIdAndDelete(id);
  if (!msg) throw new Error("MESSAGE_NOT_FOUND");

  return { message: "Message deleted successfully" };
};

// MARK READ
const markReadService = async (id) => {
  const msg = await Message.findById(id);
  if (!msg) throw new Error("MESSAGE_NOT_FOUND");

  msg.isRead = true;
  await msg.save();

  return msg;
};

// MARK UNREAD
const markUnreadService = async (id) => {
  const msg = await Message.findById(id);
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