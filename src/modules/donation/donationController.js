const {
  createDonationService,
  getAllDonationsService,
  deleteDonationService,
  updateDonationStatusService,
} = require("./donationService");


const createDonation = async (req, res) => {
  try {
    const donation = await createDonationService({
      data: req.body,
      file: req.file,
    });

    res.status(201).json({ success: true, donation });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


const getAllDonations = async (req, res) => {
  try {
    const donations = await getAllDonationsService();
    res.status(200).json({ success: true, donations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const deleteDonation = async (req, res) => {
  try {
    await deleteDonationService(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};


const updateDonationStatus = async (req, res) => {
  try {
    const donation = await updateDonationStatusService({
      id: req.params.id,
      status: req.body.status,
    });

    res.json({ success: true, donation });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  createDonation,
  getAllDonations,
  deleteDonation,
  updateDonationStatus,
};