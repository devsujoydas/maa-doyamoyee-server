const express = require("express");
const router = express.Router();
const upload = require("../../../utils/multer");

const {
  createDonation,
  getAllDonations,
  deleteDonation,
  updateDonationStatus,
} = require("./donationController");
const authorizeRoles = require("../../middlewares/authorizeRoles");

// CREATE donation with optional paymentProof 
router.post("/", upload.single("paymentProof"), createDonation);

// GET all donations
router.get("/",authorizeRoles("admin", "moderator"), getAllDonations);

// DELETE donation
router.delete("/:id",authorizeRoles("admin", "moderator"), deleteDonation);

// PATCH status
router.patch("/:id/status",authorizeRoles("admin", "moderator"), updateDonationStatus);

module.exports = router;