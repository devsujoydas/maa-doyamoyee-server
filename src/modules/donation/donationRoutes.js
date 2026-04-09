const express = require("express");
const router = express.Router();
const upload = require("../../../utils/multer");

const {
  createDonation,
  getAllDonations,
  deleteDonation,
  updateDonationStatus,
} = require("./donationController");

// CREATE donation with optional paymentProof
router.post("/", upload.single("paymentProof"), createDonation);

// GET all donations
router.get("/", getAllDonations);

// DELETE donation
router.delete("/:id", deleteDonation);

// PATCH status
router.patch("/:id/status", updateDonationStatus);

module.exports = router;