const {
  getNoticesService,
  getNoticeService,
  createNoticeService,
  updateNoticeService,
  deleteNoticeService,
  updateNoticeStatusService,
} = require("./noticeServices");

// GET ALL
const getNotices = async (req, res) => {
  try {
    const data = await getNoticesService(req);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
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

// CREATE
const createNotice = async (req, res) => {
  try {
    const notice = await createNoticeService(req);
    res.status(201).json({
      message: "Notice created successfully",
      notice,
    });
  } catch (err) {
    if (err.message === "REQUIRED_FIELDS_MISSING") {
      return res.status(400).json({ message: "Title & Description required" });
    }
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateNotice = async (req, res) => {
  try {
    const notice = await updateNoticeService(req);
    res.status(200).json({
      message: "Notice updated successfully",
      notice,
    });
  } catch (err) {
    if (err.message === "NOTICE_NOT_FOUND") {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(500).json({ message: err.message });
  }
};

// DELETE
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

// STATUS UPDATE
const updateNoticeStatus = async (req, res) => {
  try {
    const notice = await updateNoticeStatusService(req);
    res.status(200).json({
      message: "Status updated successfully",
      notice,
    });
  } catch (err) {
    if (err.message === "NOTICE_NOT_FOUND") {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(500).json({ message: err.message });
  }
};




// TOGGLE PINNED
const togglePinned = async (req, res) => {
  try {
    const notice = await togglePinnedService(req);
    res.status(200).json({
      message: `Pinned ${notice.isPinned ? "enabled" : "disabled"}`,
      notice,
    });
  } catch (err) {
    if (err.message === "NOTICE_NOT_FOUND") {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(500).json({ message: err.message });
  }
};

// TOGGLE IMPORTANT
const toggleImportant = async (req, res) => {
  try {
    const notice = await toggleImportantService(req);
    res.status(200).json({
      message: `Important ${notice.isImportant ? "enabled" : "disabled"}`,
      notice,
    });
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
  updateNoticeStatus,
  togglePinned,
  toggleImportant,
};
