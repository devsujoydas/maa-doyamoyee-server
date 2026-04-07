const Notice = require("./noticeModel");

// GET ALL
const getNoticesService = async (query) => {
  const { search, status } = query;

  const filter = {};

  if (status) filter.status = status;

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const notices = await Notice.find(filter)
    .populate("author", "name username profileImage")
    .sort({ isPinned: -1, createdAt: -1 });

  return {
    total: notices.length,
    notices,
  };
};

// GET ONE
const getNoticeService = async (id) => {
  const notice = await Notice.findById(id).populate(
    "author",
    "name username profileImage"
  );

  if (!notice) throw new Error("NOTICE_NOT_FOUND");

  return notice;
};

// CREATE
const createNoticeService = async (userId, data) => {
  const { title, description, eventDate } = data;

  if (!title || !description) {
    throw new Error("REQUIRED_FIELDS_MISSING");
  }

  let parsedDate = null;

  if (eventDate) {
    parsedDate = new Date(eventDate);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("INVALID_DATE");
    }
  }

  const notice = await Notice.create({
    ...data,
    eventDate: parsedDate,
    author: userId,
  });

  return notice;
};

// UPDATE
const updateNoticeService = async (id, data) => {
  const notice = await Notice.findById(id);
  if (!notice) throw new Error("NOTICE_NOT_FOUND");

  const fields = [
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

  fields.forEach((field) => {
    if (data[field] !== undefined) {
      if (field === "eventDate" && data[field]) {
        const d = new Date(data[field]);
        if (isNaN(d.getTime())) {
          throw new Error("INVALID_DATE");
        }
        notice[field] = d;
      } else {
        notice[field] = data[field];
      }
    }
  });

  await notice.save();

  return notice;
};

// DELETE
const deleteNoticeService = async (id) => {
  const notice = await Notice.findByIdAndDelete(id);
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