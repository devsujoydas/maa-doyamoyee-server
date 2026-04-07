const express = require("express");
const router = express.Router();

const {
  getAllGallery,
  createGallery,
  updateGallery,
  deleteGallery,
} = require("./galleryController");
const upload = require("../../../utils/multer");
const isAdmin = require("../../middlewares/isAdmin");

// GET
router.get("/", getAllGallery);

// CREATE
router.post("/", isAdmin, upload.single("image"), createGallery);

router.put("/:id", isAdmin, upload.single("image"), updateGallery);

// DELETE
router.delete("/:id", isAdmin, deleteGallery);

module.exports = router;
