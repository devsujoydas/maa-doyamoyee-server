const Gallery = require("./galleryModel");

const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../../../utils/uploadService");

// GET ALL
const getAllGalleryService = async (query) => {
  const { category, status, isShow } = query;

  const filter = {};

  if (category) filter.category = category;
  if (status) filter.status = status;
  if (isShow) filter.isShow = isShow;

  const data = await Gallery.find(filter)
    .populate("author", "name username profileImage")
    .sort({ createdAt: -1 });

  return {
    total: data.length,
    gallery: data,
  };
};

// CREATE
const createGalleryService = async (userId, body, file) => {
  const { title, category, status, isShow, location } = body;

  if (!title) throw new Error("TITLE_REQUIRED");
  if (!file) throw new Error("IMAGE_REQUIRED");

  const result = await uploadImageToCloudinary(
    file.buffer,
    "gallery"
  );

  const gallery = await Gallery.create({
    title,
    category,
    status,
    isShow,
    location,
    image: result,
    author: userId,
  });

  return gallery;
};

// UPDATE
const updateGalleryService = async (user, id, body, file) => {
  const gallery = await Gallery.findById(id);
  if (!gallery) throw new Error("GALLERY_NOT_FOUND");

  // 🔥 auth (admin or author)
  if (!gallery.author.equals(user.id) && user.role !== "admin") {
    throw new Error("UNAUTHORIZED");
  }

  // text update
  if (body.title) gallery.title = body.title;
  if (body.category) gallery.category = body.category;
  if (body.status) gallery.status = body.status;
  if (body.isShow) gallery.isShow = body.isShow;
  if (body.location) gallery.location = body.location;

  // image replace
  if (file) {
    if (gallery.image?.publicId) {
      await deleteImageFromCloudinary(gallery.image.publicId);
    }

    const result = await uploadImageToCloudinary(
      file.buffer,
      "gallery"
    );

    gallery.image = result;
  }

  await gallery.save();

  return gallery;
};

// DELETE
const deleteGalleryService = async (user, id) => {
  const gallery = await Gallery.findById(id);
  if (!gallery) throw new Error("GALLERY_NOT_FOUND");

  if (!gallery.author.equals(user.id) && user.role !== "admin") {
    throw new Error("UNAUTHORIZED");
  }

  // delete image
  if (gallery.image?.publicId) {
    await deleteImageFromCloudinary(gallery.image.publicId);
  }

  await gallery.deleteOne();

  return { message: "Gallery deleted successfully" };
};

module.exports = {
  getAllGalleryService,
  createGalleryService,
  updateGalleryService,
  deleteGalleryService,
};