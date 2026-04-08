const Notice = require("./noticeModel");

// GET ALL
const getNoticesService = async (query) => {
  const { search, status, page = 1, limit = 10 } = query;
  const filter = {};

  if (status) filter.status = status;
  if (search) filter.$text = { $search: search };

  const skip = (page - 1) * limit;

  const notices = await Notice.find(filter)
    .populate("author", "name username profileImage")
    .sort({ createdAt: -1 })


  const total = await Notice.countDocuments(filter);
  return notices ;
};

// GET ONE
const getNoticeService = async (id) => {
  const notice = await Notice.findById(id).populate("author", "name username profileImage");
  if (!notice) throw new Error("NOTICE_NOT_FOUND");
  return notice;
};

// CREATE
const createNoticeService = async (userId, data) => {
  const { title, description, eventDate, eventTime } = data;
  if (!title || !description) throw new Error("REQUIRED_FIELDS_MISSING");

  if (eventDate && isNaN(new Date(eventDate).getTime())) throw new Error("INVALID_DATE");
  if (eventTime && !/^\d{2}:\d{2}$/.test(eventTime)) throw new Error("INVALID_TIME");

  return await Notice.create({ ...data, eventDate: eventDate || null, author: userId });
};

// UPDATE
const updateNoticeService = async (id, data) => {
  const notice = await Notice.findById(id);
  if (!notice) throw new Error("NOTICE_NOT_FOUND");

  const fields = ["title","description","category","pdfUrl","isPinned","status","eventDate","eventTime","issuedBy","venue"];
  fields.forEach(f => {
    if (data[f] !== undefined) {
      if (f === "eventDate" && data[f]) {
        if (isNaN(new Date(data[f]).getTime())) throw new Error("INVALID_DATE");
        notice[f] = new Date(data[f]);
      } else if (f === "eventTime" && data[f]) {
        if (!/^\d{2}:\d{2}$/.test(data[f])) throw new Error("INVALID_TIME");
        notice[f] = data[f];
      } else {
        notice[f] = data[f];
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

module.exports = { getNoticesService, getNoticeService, createNoticeService, updateNoticeService, deleteNoticeService };