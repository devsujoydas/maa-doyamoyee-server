const {
  createDonationService,
  getDonationsService,
  getDonationService,
  updateDonationService,
  deleteDonationService,
} = require("./donationService");

// CREATE
const createDonation = async (req, res) => {
  try {
    const donation = await createDonationService(req);
    res
      .status(201)
      .json({ message: "Donation submitted successfully", donation });
  } catch (err) {
    if (err.message === "REQUIRED_FIELDS_MISSING") {
      return res
        .status(400)
        .json({
          message: "Name, Email, Donation Amount & Payment Method required",
        });
    }
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
const getDonations = async (req, res) => {
  try {
    const data = await getDonationsService();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getDonation = async (req, res) => {
  try {
    const donation = await getDonationService(req.params.id);
    res.status(200).json(donation);
  } catch (err) {
    if (err.message === "DONATION_NOT_FOUND") {
      return res.status(404).json({ message: "Donation not found" });
    }
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateDonation = async (req, res) => {
  try {
    const donation = await updateDonationService(
      req.params.id,
      req.body,
      req.file,
    );
    res
      .status(200)
      .json({ message: "Donation updated successfully", donation });
  } catch (err) {
    if (err.message === "DONATION_NOT_FOUND") {
      return res.status(404).json({ message: "Donation not found" });
    }
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteDonation = async (req, res) => {
  try {
    const result = await deleteDonationService(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    if (err.message === "DONATION_NOT_FOUND") {
      return res.status(404).json({ message: "Donation not found" });
    }
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createDonation,
  getDonations,
  getDonation,
  updateDonation,
  deleteDonation,
};
