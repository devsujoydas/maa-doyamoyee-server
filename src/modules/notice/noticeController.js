const mongoose = require("mongoose");
const {
  getNoticesService,
  getNoticeService,
  createNoticeService,
  updateNoticeService,
  deleteNoticeService,
} = require("./noticeService");

// GET ALL
const getNotices = async (req, res) => {
  try {
    const data = await getNoticesService(req.query);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
const getNotice = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: "Invalid ID" });
    const notice = await getNoticeService(req.params.id);
    res.status(200).json(notice);
  } catch (err) {
    res.status(err.message === "NOTICE_NOT_FOUND" ? 404 : 500).json({ message: err.message });
  }
};

// CREATE
const createNotice = async (req, res) => {
  try {
    const notice = await createNoticeService(req.user.id, req.body);
    res.status(201).json({ message: "Notice created", notice });
  } catch (err) {
    const status = ["REQUIRED_FIELDS_MISSING","INVALID_DATE","INVALID_TIME"].includes(err.message) ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
};

// UPDATE
const updateNotice = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: "Invalid ID" });
    const notice = await updateNoticeService(req.params.id, req.body);
    res.status(200).json({ message: "Notice updated", notice });
  } catch (err) {
    const status = ["NOTICE_NOT_FOUND"].includes(err.message) ? 404 : ["INVALID_DATE","INVALID_TIME"].includes(err.message) ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
};

// DELETE
const deleteNotice = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: "Invalid ID" });
    const result = await deleteNoticeService(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.message === "NOTICE_NOT_FOUND" ? 404 : 500).json({ message: err.message });
  }
};

module.exports = { getNotices, getNotice, createNotice, updateNotice, deleteNotice };