const Donation = require("./donationModel");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../../../utils/uploadService");

// CREATE
const createDonationService = async ({ data, file }) => {
  if (data.bankPayment) data.bankPayment = JSON.parse(data.bankPayment);
  if (data.mobilePayment) data.mobilePayment = JSON.parse(data.mobilePayment);

  let paymentProof = null;

  if (file) {
    paymentProof = await uploadImageToCloudinary(file.buffer, "donations");
  }

  return await Donation.create({
    ...data,
    paymentAmount: Number(data.paymentAmount),
    paymentProof,
    status: "pending",
  });
};

// GET ALL
const getAllDonationsService = async () => {
  return await Donation.find().sort({ createdAt: -1 });
};

// DELETE
const deleteDonationService = async (id) => {
  const donation = await Donation.findById(id);
  if (!donation) throw new Error("Donation not found");

  if (donation.paymentProof?.publicId) {
    await deleteImageFromCloudinary(donation.paymentProof.publicId);
  }

  await donation.deleteOne();
};

// UPDATE STATUS
const updateDonationStatusService = async ({ id, status }) => {
  if (!["pending", "approved", "rejected"].includes(status)) {
    throw new Error("Invalid status");
  }

  const donation = await Donation.findByIdAndUpdate(
    id,
    { status },
    { new: true },
    {
      returnDocument: "after",
    },
  );

  if (!donation) throw new Error("Donation not found");

  return donation;
};

module.exports = {
  createDonationService,
  getAllDonationsService,
  deleteDonationService,
  updateDonationStatusService,
};
