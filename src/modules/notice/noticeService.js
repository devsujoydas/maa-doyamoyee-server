const Notice = require("./noticeModel");

const getAllNoticesService = async () => {
  return await Notice.find().sort({ createdAt: -1 });
};

const getNoticeByIdService = async (id) => {
  const notice = await Notice.findById(id);
  if (!notice) throw new Error("Notice not found");
  return notice;
};

const createNoticeService = async (data) => {
  const notice = new Notice(data);
  return await notice.save();
};

const updateNoticeByIdService = async (id, data) => {
  const notice = await Notice.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
  if (!notice) throw new Error("Notice not found");
  return notice;
};

const deleteNoticeByIdService = async (id) => {
  const notice = await Notice.findByIdAndDelete(id);
  if (!notice) throw new Error("Notice not found");
  return { message: "Deleted successfully" };
};

const togglePinByIdService = async (id) => {
  const notice = await Notice.findById(id);
  if (!notice) throw new Error("Notice not found");
  notice.pinned = !notice.pinned;
  return await notice.save();
};

const toggleStatusByIdService = async (id) => {
  const notice = await Notice.findById(id);
  if (!notice) throw new Error("Notice not found");
  notice.active = !notice.active;
  return await notice.save();
};

module.exports = {
  getAllNoticesService,
  getNoticeByIdService,
  createNoticeService,
  updateNoticeByIdService,
  deleteNoticeByIdService,
  togglePinByIdService,
  toggleStatusByIdService,
};
