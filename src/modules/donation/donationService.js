const Donation = require("./donationModel");
const { uploadImageToCloudinary } = require("../../../utils/uploadService");


const createDonationService = async (req) => {
  const {
    name,
    email,
    phone,
    donationAmount,
    optionalMessage,
    paymentMethod,
    bankDetails,
    mobileBankingDetails,
  } = req.body;

  if (!name || !email || !donationAmount || !paymentMethod) {
    throw new Error("REQUIRED_FIELDS_MISSING");
  }

  let paymentScreenshotUrl;
  if (req.file) {
    const uploaded = await uploadImageToCloudinary(req.file.buffer, "donation_screenshots");
    paymentScreenshotUrl = uploaded.url;
  }

  const donation = await Donation.create({
    name,
    email,
    phone,
    donationAmount,
    paymentScreenshot: paymentScreenshotUrl,
    optionalMessage,
    paymentMethod,
    bankDetails: paymentMethod === "bank transfer" ? bankDetails : undefined,
    mobileBankingDetails: paymentMethod === "mobile banking" ? mobileBankingDetails : undefined,
  });

  return donation;
};

// GET ALL DONATIONS
const getDonationsService = async () => {
  const donations = await Donation.find().sort({ createdAt: -1 });
  return { total: donations.length, donations };
};

// GET SINGLE DONATION
const getDonationService = async (id) => {
  const donation = await Donation.findById(id);
  if (!donation) throw new Error("DONATION_NOT_FOUND");
  return donation;
};

// UPDATE DONATION
const updateDonationService = async (id, data, file) => {
  const donation = await Donation.findById(id);
  if (!donation) throw new Error("DONATION_NOT_FOUND");

  if (file) {
    const uploaded = await uploadImageToCloudinary(file.buffer, "donation_screenshots");
    data.paymentScreenshot = uploaded.url;
  }

  Object.assign(donation, data);
  await donation.save();
  return donation;
};

// DELETE DONATION
const deleteDonationService = async (id) => {
  const donation = await Donation.findByIdAndDelete(id);
  if (!donation) throw new Error("DONATION_NOT_FOUND");

  return { message: "Donation deleted successfully" };
};

module.exports = {
  createDonationService,
  getDonationsService,
  getDonationService,
  updateDonationService,
  deleteDonationService,
};