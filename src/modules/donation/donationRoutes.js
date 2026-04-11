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


router.post("/", upload.single("paymentProof"), createDonation);
router.get("/",authorizeRoles("admin", "moderator"), getAllDonations);
router.delete("/:id",authorizeRoles("admin", "moderator"), deleteDonation);
router.patch("/:id/status",authorizeRoles("admin", "moderator"), updateDonationStatus);

module.exports = router;