const {
  createMessageService,
  getMessagesService,
  updateMessageService,
  deleteMessageService,
  markReadService,
  markUnreadService,
} = require("./messageServices");

// CREATE (public)
const createMessage = async (req, res) => {
  try {
    const message = await createMessageService(req);
    res.status(201).json({
      message: "Message sent successfully",
      data: message,
    });
  } catch (err) {
    if (err.message === "REQUIRED_FIELDS_MISSING") {
      return res.status(400).json({ message: "Name, Email & Message required" });
    }
    res.status(500).json({ message: err.message });
  }
};

// GET ALL (admin)
const getMessages = async (req, res) => {
  try {
    const data = await getMessagesService(req);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateMessage = async (req, res) => {
  try {
    const msg = await updateMessageService(req);
    res.status(200).json({
      message: "Message updated",
      data: msg,
    });
  } catch (err) {
    if (err.message === "MESSAGE_NOT_FOUND") {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteMessage = async (req, res) => {
  try {
    const result = await deleteMessageService(req);
    res.status(200).json(result);
  } catch (err) {
    if (err.message === "MESSAGE_NOT_FOUND") {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(500).json({ message: err.message });
  }
};

// MARK READ
const markRead = async (req, res) => {
  try {
    const msg = await markReadService(req);
    res.status(200).json({
      message: "Marked as read",
      data: msg,
    });
  } catch (err) {
    if (err.message === "MESSAGE_NOT_FOUND") {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(500).json({ message: err.message });
  }
};

// MARK UNREAD
const markUnread = async (req, res) => {
  try {
    const msg = await markUnreadService(req);
    res.status(200).json({
      message: "Marked as unread",
      data: msg,
    });
  } catch (err) {
    if (err.message === "MESSAGE_NOT_FOUND") {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createMessage,
  getMessages,
  updateMessage,
  deleteMessage,
  markRead,
  markUnread,
};