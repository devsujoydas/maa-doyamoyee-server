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

// CREATE (public donation form)
router.post("/", upload.single("paymentProof"), createDonation);

// GET ALL (admin only)
router.get("/", authorizeRoles("admin", "ceo"), getAllDonations);

// DELETE (admin only)
router.delete("/:id", authorizeRoles("admin", "ceo"), deleteDonation);

// STATUS UPDATE (admin only)
router.patch("/:id/status", authorizeRoles("admin", "ceo"), updateDonationStatus);

module.exports = router;