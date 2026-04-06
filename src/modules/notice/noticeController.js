const {
  getNoticesService,
  getNoticeService,
  createNoticeService,
  updateNoticeService,
  deleteNoticeService,
} = require("./noticeServices");

// GET ALL NOTICES
const getNotices = async (req, res) => {
  try {
    const notices = await getNoticesService(req);
    res.status(200).json(notices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE NOTICE
const getNotice = async (req, res) => {
  try {
    const notice = await getNoticeService(req);
    res.status(200).json(notice);
  } catch (err) {
    if (err.message === "NOTICE_NOT_FOUND") {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(500).json({ message: err.message });
  }
};

// CREATE NOTICE
const createNotice = async (req, res) => {
  try {
    const notice = await createNoticeService(req);
    res.status(201).json(notice);
  } catch (err) {
    if (err.message === "REQUIRED_FIELDS_MISSING") {
      return res.status(400).json({ message: "Title & Description required" });
    }
    res.status(500).json({ message: err.message });
  }
};

// UPDATE NOTICE
const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await updateNoticeService(id, req.body);
    res.status(201).json(notice);
  } catch (err) {
    if (err.message === "NOTICE_NOT_FOUND") {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(400).json({ message: err.message });
  }
};

// DELETE NOTICE
const deleteNotice = async (req, res) => {
  try {
    const result = await deleteNoticeService(req);
    res.status(200).json(result);
  } catch (err) {
    if (err.message === "NOTICE_NOT_FOUND") {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getNotices,
  getNotice,
  createNotice,
  updateNotice,
  deleteNotice,
};
