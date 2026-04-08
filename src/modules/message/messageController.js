 
const sendEmail = require("../../../utils/sendEmail");
const {
  createMessageService,
  getMessagesService,
  deleteMessageService,
  markReadService,
  markUnreadService,
  sendReplyService,
} = require("./messageService");

// CREATE
const createMessage = async (req, res) => {
  try {
    const msg = await createMessageService(req.body);
    res.status(201).json({ message: "Message sent", data: msg });
  } catch (err) {
    if (err.message === "REQUIRED_FIELDS_MISSING") {
      return res.status(400).json({ message: "Required fields missing" });
    }
    res.status(500).json({ message: err.message });
  }
};

// GET
const getMessages = async (req, res) => {
  try {
    const data = await getMessagesService(req.query);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteMessage = async (req, res) => {
  try {
    const result = await deleteMessageService(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// MARK READ
const markRead = async (req, res) => {
  try {
    const msg = await markReadService(req.params.id);
    res.status(200).json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// MARK UNREAD
const markUnread = async (req, res) => {
  try {
    const msg = await markUnreadService(req.params.id);
    res.status(200).json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REPLY
const sendReply = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: "Reply required" });

    const msg = await sendReplyService(req.params.id, message);

    await sendEmail(
      msg.email,
      "Reply from Maa Doyamoyee 🔱",
      `<p>${message}</p>`
    );

    res.status(200).json({ message: "Reply sent", data: msg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createMessage,
  getMessages,
  deleteMessage,
  markRead,
  markUnread,
  sendReply,
};