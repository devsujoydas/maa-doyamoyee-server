const Notice = require("./noticeModel");

// GET ALL NOTICES
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

  return notices;
};

// GET SINGLE NOTICE
const getNoticeService = async (req) => {
  const notice = await Notice.findById(req.params.id);
  if (!notice) throw new Error("NOTICE_NOT_FOUND");

  return notice;
};

// CREATE NOTICE
const createNoticeService = async (req) => {
  const data = req.body;
  const {
    title,
    description,
    category,
    pdfUrl,
    isPinned,
    status,
    eventDate,
    eventTime,
    issuedBy,
    venue,
  } = data;

  if (!title || !description) throw new Error("REQUIRED_FIELDS_MISSING");

  const newNotice = await Notice.create({
    title,
    description,
    category,
    pdfUrl,
    isPinned: isPinned || false,
    status: status || "inactive",
    eventDate,
    eventTime,
    issuedBy,
    venue,
  });

  return newNotice;
};

// UPDATE NOTICE
const updateNoticeService = async (id, data) => {
  if (!id) throw new Error("NOTICE_NOT_FOUND");

  const notice = await Notice.findById(id);
  if (!notice) throw new Error("NOTICE_NOT_FOUND");

  const updatableFields = [
    "title",
    "description",
    "category",
    "pdfUrl",
    "isPinned",
    "status",
    "eventDate",
    "eventTime",
    "issuedBy",
    "venue",
  ];
 

  updatableFields.forEach((field) => {
    if (data[field] !== undefined) notice[field] = data[field];
  });

  const updatedNotice = await notice.save();
  return updatedNotice;
};

// DELETE NOTICE
const deleteNoticeService = async (req) => {
  const notice = await Notice.findByIdAndDelete(req.params.id);
  if (!notice) throw new Error("NOTICE_NOT_FOUND");

  return { message: "Notice deleted successfully" };
};

module.exports = {
  getNoticesService,
  getNoticeService,
  createNoticeService,
  updateNoticeService,
  deleteNoticeService,
};
