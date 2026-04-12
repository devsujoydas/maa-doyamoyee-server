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
const authorizeRoles = require("../../middlewares/authorizeRoles");


// GET ALL
router.get("/", getAllGallery);

// GET ONE
router.get("/:id", getGalleryById);

// CREATE
router.post("/",authorizeRoles("ceo"), upload.single("image"), createGallery);

// UPDATE
router.put("/:id",authorizeRoles("ceo"), upload.single("image"), updateGallery);

// DELETE
router.delete("/:id",authorizeRoles("ceo"), deleteGallery);

module.exports = router;