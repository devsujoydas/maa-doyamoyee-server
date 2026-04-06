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

  let parsedDate = null;

  if (eventDate) {
    const d = new Date(eventDate);
    if (!isNaN(d.getTime())) parsedDate = d;  
  }


  const notice = await Notice.create({
    title,
    description,
    category,
    pdfUrl,
    isPinned: isPinned ?? false,
    status: status || "active",
    eventDate: parsedDate,
    eventTime,
    issuedBy,
    venue,
  });


  return notice;
};

// UPDATE NOTICE
const updateNoticeService = async (id, data) => {
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

  await notice.save();
  return notice;
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
