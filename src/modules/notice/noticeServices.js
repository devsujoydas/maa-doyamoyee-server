const Notice = require("./noticeModel");

// GET ALL
const getNoticesService = async (req) => {
  const { search, status } = req.query;
  const filter = {};

  if (status) filter.status = status;

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const notices = await Notice.find(filter).sort({
    isPinned: -1,
    createdAt: -1,
  });

  return {
    total: notices.length,
    notices,
  };
};

// GET SINGLE
const getNoticeService = async (req) => {
  const notice = await Notice.findById(req.params.id);
  if (!notice) throw new Error("NOTICE_NOT_FOUND");

  return notice;
};

// CREATE
const createNoticeService = async (req) => {
  const { title, description } = req.body;

  if (!title || !description) {
    throw new Error("REQUIRED_FIELDS_MISSING");
  }

  const notice = await Notice.create(req.body);
  return notice;
};

// UPDATE
const updateNoticeService = async (req) => {
  const notice = await Notice.findById(req.params.id);
  if (!notice) throw new Error("NOTICE_NOT_FOUND");

  Object.assign(notice, req.body);
  await notice.save();

  return notice;
};

// DELETE
const deleteNoticeService = async (req) => {
  const notice = await Notice.findById(req.params.id);
  if (!notice) throw new Error("NOTICE_NOT_FOUND");

  await Notice.findByIdAndDelete(req.params.id);

  return { message: "Notice deleted successfully" };
};

// STATUS UPDATE
const updateNoticeStatusService = async (req) => {
  const { status } = req.body;

  const notice = await Notice.findById(req.params.id);
  if (!notice) throw new Error("NOTICE_NOT_FOUND");

  notice.status = status;
  await notice.save();

  return notice;
};

const togglePinnedService = async (req) => {
  const notice = await Notice.findById(req.params.id);
  if (!notice) throw new Error("NOTICE_NOT_FOUND");

  notice.isPinned = !notice.isPinned;
  await notice.save();

  return notice;
};

const toggleImportantService = async (req) => {
  const notice = await Notice.findById(req.params.id);
  if (!notice) throw new Error("NOTICE_NOT_FOUND");

  notice.isImportant = !notice.isImportant;
  await notice.save();

  return notice;
};

module.exports = {
  getNoticesService,
  getNoticeService,
  createNoticeService,
  updateNoticeService,
  deleteNoticeService,
  updateNoticeStatusService,
  togglePinnedService,
  toggleImportantService,
};
