const Gallery = require("./galleryModel");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../../../utils/uploadService");

const generateSEO = (title, description) => {
  const keywords = [
    "Shri Shri Ri Doyamoyee Temple",
    "শ্রী শ্রীঁ রী দয়াময়ী মন্দির",
    "Doyamoyee Temple",
    "Hindu Temple Bangladesh",
  ];

  const picked = keywords.slice(0, 2);

  return {
    altText: description
      ? `${title} - ${description.split("।")[0]}`
      : `${title} - ${picked.join(", ")}`,
  };
};

const createGalleryService = async ({
  fileBuffer,
  folder,
  title,
  description,
  eventDate,
}) => {
  const imgData = await uploadImageToCloudinary(fileBuffer, folder);
  const seo = generateSEO(title, description);

  const gallery = await Gallery.create({
    title,
    description,
    eventDate: eventDate || null,
    img: imgData,
    ...seo,
  });

  return gallery;
};

const updateGalleryService = async (
  id,
  { title, description, eventDate, fileBuffer, folder },
) => {
  const gallery = await Gallery.findById(id);
  if (!gallery) throw new Error("Gallery not found");

  // Update image if new file provided
  if (fileBuffer) {
    await deleteImageFromCloudinary(gallery.img.publicId);
    const imgData = await uploadImageToCloudinary(fileBuffer, folder);
    gallery.img = imgData;
  }

  gallery.title = title || gallery.title;
  gallery.description = description || gallery.description;
  gallery.eventDate = eventDate || gallery.eventDate;

  // Regenerate SEO
  const seo = generateSEO(gallery.title, gallery.description);
  gallery.altText = seo.altText;
  gallery.metaTitle = seo.metaTitle;
  gallery.metaDescription = seo.metaDescription;

  await gallery.save();
  return gallery;
};

const deleteGalleryService = async (id) => {
  const gallery = await Gallery.findById(id);

  if (!gallery) {
    throw new Error("Gallery not found");
  }

  await deleteImageFromCloudinary(gallery.img.publicId);

  const deletedGallery = await Gallery.findByIdAndDelete(id);

  return deletedGallery;
};

const getAllGalleryService = async () => {
  return await Gallery.find().sort({ eventDate: 1, uploadedAt: -1 });
};

const getGalleryByIdService = async (id) => {
  const gallery = await Gallery.findById(id);
  if (!gallery) throw new Error("Gallery not found");
  return gallery;
};

module.exports = {
  createGalleryService,
  updateGalleryService,
  deleteGalleryService,
  getAllGalleryService,
  getGalleryByIdService,
};
