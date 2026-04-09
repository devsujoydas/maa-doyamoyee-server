const express = require("express");
const router = express.Router(); 
const  {
  createGallery,
  updateGallery,
  deleteGallery,
  getAllGallery,
  getGalleryById,
} = require("./galleryController");
const upload = require("../../../utils/multer");


// GET ALL
router.get("/", getAllGallery);

// GET ONE
router.get("/:id", getGalleryById);

// CREATE
router.post("/", upload.single("image"), createGallery);

// UPDATE
router.put("/:id", upload.single("image"), updateGallery);

// DELETE
router.delete("/:id", deleteGallery);

module.exports = router;