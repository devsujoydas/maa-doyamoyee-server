const {
  createGalleryService,
  updateGalleryService,
  deleteGalleryService,
  getAllGalleryService,
  getGalleryByIdService,
} = require("./galleryService");

// CREATE
const createGallery = async (req, res) => {
  try {
    const { title, description, eventDate } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "Image is required" });


    const gallery = await createGalleryService({
      fileBuffer: file.buffer,
      folder: "temple-gallery",
      title,
      description,
      eventDate,
    });

    res.status(201).json({ success: true, data: gallery });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE
const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, eventDate } = req.body;
    const file = req.file;

    const gallery = await updateGalleryService(id, {
      title,
      description,
      eventDate,
      fileBuffer: file ? file.buffer : null,
      folder: "temple-gallery",
    });

    res.status(200).json({ success: true, data: gallery });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE
const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteGalleryService(id);
    res.status(200).json({ success: true, message: "Gallery deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL
const getAllGallery = async (req, res) => {
  try {
    const galleries = await getAllGalleryService();
    res.status(200).json({ success: true, data: galleries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ONE
const getGalleryById = async (req, res) => {
  try {
    const { id } = req.params;
    const gallery = await getGalleryByIdService(id);
    res.status(200).json({ success: true, data: gallery });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createGallery,
  updateGallery,
  deleteGallery,
  getAllGallery,
  getGalleryById,
};
