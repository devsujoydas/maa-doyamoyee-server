const Message = require("./messageModel");

// CREATE
const createMessageService = async (data) => {
  const { name, email, message } = data;

  if (!name || !email || !message) {
    throw new Error("REQUIRED_FIELDS_MISSING");
  }

  return await Message.create(data);
};

// GET ALL (search + filter)
const getMessagesService = async (query) => {
  const { search, status } = query;

  let filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { message: { $regex: search, $options: "i" } },
    ];
  }

  if (status === "read") filter.isRead = true;
  if (status === "unread") filter.isRead = false;

  const messages = await Message.find(filter).sort({ createdAt: -1 });

  return { total: messages.length, messages };
};

// DELETE
const deleteMessageService = async (id) => {
  const msg = await Message.findByIdAndDelete(id);
  if (!msg) throw new Error("MESSAGE_NOT_FOUND");
  return { message: "Deleted successfully" };
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

// REPLY
const sendReplyService = async (id, replyText) => {
  const msg = await Message.findById(id);
  if (!msg) throw new Error("MESSAGE_NOT_FOUND");

  msg.replies.push({ message: replyText });
  msg.isRead = true;

  await msg.save();

  return msg;
};

module.exports = {
  createMessageService,
  getMessagesService,
  deleteMessageService,
  markReadService,
  markUnreadService,
  sendReplyService,
};