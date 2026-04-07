const {
  getAllGalleryService,
  createGalleryService,
  updateGalleryService,
  deleteGalleryService,
} = require("./galleryService");

// GET ALL
const getAllGallery = async (req, res) => {
  try {
    const data = await getAllGalleryService(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
const createGallery = async (req, res) => {
  try {
    const data = await createGalleryService(
      req.user.id,
      req.body,
      req.file
    );

    res.status(201).json({
      message: "Image uploaded successfully",
      gallery: data,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
const updateGallery = async (req, res) => {
  try {
    const data = await updateGalleryService(
      req.user,
      req.params.id,
      req.body,
      req.file
    );

    res.json({
      message: "Gallery updated successfully",
      gallery: data,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
const deleteGallery = async (req, res) => {
  try {
    const data = await deleteGalleryService(
      req.user,
      req.params.id
    );

    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllGallery,
  createGallery,
  updateGallery,
  deleteGallery,
};