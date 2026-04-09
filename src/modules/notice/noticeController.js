const {
  getAllNoticesService,
  getNoticeByIdService,
  createNoticeService,
  updateNoticeByIdService,
  deleteNoticeByIdService,
  togglePinByIdService,
  toggleStatusByIdService,
} = require("./noticeService");

const getNotices = async (req, res) => {
  try {
    const notices = await getAllNoticesService();
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getNotice = async (req, res) => {
  try {
    const notice = await getNoticeByIdService(req.params.id);
    res.json(notice);
  } catch (err) {
    if (err.message === "Notice not found")
      return res.status(404).json({ message: err.message });
    res.status(500).json({ message: err.message });
  }
};

const createNotice = async (req, res) => {
  try {
    const notice = await createNoticeService(req.body);
    res.status(201).json(notice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateNotice = async (req, res) => {
  try {
    const notice = await updateNoticeByIdService(req.params.id, req.body);
    res.json(notice);
  } catch (err) {
    if (err.message === "Notice not found")
      return res.status(404).json({ message: err.message });
    res.status(400).json({ message: err.message });
  }
};

const deleteNotice = async (req, res) => {
  try {
    const result = await deleteNoticeByIdService(req.params.id);
    res.json(result);
  } catch (err) {
    if (err.message === "Notice not found")
      return res.status(404).json({ message: err.message });
    res.status(500).json({ message: err.message });
  }
};

const togglePin = async (req, res) => {
  try {
    const notice = await togglePinByIdService(req.params.id);
    res.json(notice);
  } catch (err) {
    if (err.message === "Notice not found")
      return res.status(404).json({ message: err.message });
    res.status(500).json({ message: err.message });
  }
};

const toggleStatus = async (req, res) => {
  try {
    const notice = await toggleStatusByIdService(req.params.id);
    res.json(notice);
  } catch (err) {
    if (err.message === "Notice not found")
      return res.status(404).json({ message: err.message });
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getNotices,
  getNotice,
  createNotice,
  updateNotice,
  deleteNotice,
  togglePin,
  toggleStatus,
};
