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
    const data = await getNoticeService(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    if (err.message === "NOTICE_NOT_FOUND") {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(500).json({ message: err.message });
  }
};

// CREATE
const createNotice = async (req, res) => {
  try {
    const data = await createNoticeService(req.user.id, req.body);

    res.status(201).json({
      message: "Notice created successfully",
      notice: data,
    });
  } catch (err) {
    if (err.message === "REQUIRED_FIELDS_MISSING") {
      return res.status(400).json({
        message: "Title & Description required",
      });
    }
    if (err.message === "INVALID_DATE") {
      return res.status(400).json({
        message: "Invalid event date",
      });
    }
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateNotice = async (req, res) => {
  try {
    const data = await updateNoticeService(
      req.params.id,
      req.body
    );

    res.status(200).json({
      message: "Notice updated successfully",
      notice: data,
    });
  } catch (err) {
    if (err.message === "NOTICE_NOT_FOUND") {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(400).json({ message: err.message });
  }
};

// DELETE
const deleteNotice = async (req, res) => {
  try {
    const data = await deleteNoticeService(req.params.id);

    res.status(200).json(data);
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