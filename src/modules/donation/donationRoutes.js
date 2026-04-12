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
router.get("/",authorizeRoles("admin", "ceo"), getAllDonations);

router.delete("/:id",authorizeRoles("admin", "ceo"), deleteDonation);
router.patch("/:id/status",authorizeRoles("admin", "ceo"), updateDonationStatus);

module.exports = router;