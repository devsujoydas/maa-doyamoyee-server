const router = require("express").Router();
const isAdmin = require("../../middlewares/isAdmin"); 

const {
  createDonation,
  getDonations,
  getDonation,
  updateDonation,
  deleteDonation,
} = require("./donationController");
const upload = require("../../../utils/multer");

// PUBLIC: submit donation with optional screenshot
router.post("/", upload.single("paymentScreenshot"), createDonation);

// ADMIN: manage donations
router.get("/", isAdmin, getDonations);
router.get("/:id", isAdmin, getDonation);
router.put("/:id", isAdmin, upload.single("paymentScreenshot"), updateDonation);
router.delete("/:id", isAdmin, deleteDonation);

module.exports = router;