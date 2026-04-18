const Donation = require("./donationModel");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../../../utils/uploadService");

/**
 * CREATE DONATION
 */
const createDonationService = async ({ data, file }) => {
  // safe JSON parsing (IMPORTANT)
  if (typeof data.bankPayment === "string") {
    data.bankPayment = JSON.parse(data.bankPayment);
  }

  if (typeof data.mobilePayment === "string") {
    data.mobilePayment = JSON.parse(data.mobilePayment);
  }

  let paymentProof = null;

  // upload image if exists
  if (file) {
    paymentProof = await uploadImageToCloudinary(file.buffer, "donations");
  }

  return await Donation.create({
    accountName: data.accountName,
    email: data.email,
    phone: data.phone,
    paymentAmount: Number(data.paymentAmount),
    message: data.message || "",
    paymentMethod: data.paymentMethod,

    bankPayment: data.bankPayment || undefined,
    mobilePayment: data.mobilePayment || undefined,

    paymentProof,
    status: "pending",
  });
};

/**
 * GET ALL DONATIONS
 */
const getAllDonationsService = async () => {
  return await Donation.find().sort({ createdAt: -1 });
};

/**
 * DELETE DONATION
 */
const deleteDonationService = async (id) => {
  const donation = await Donation.findById(id);

  if (!donation) {
    throw new Error("Donation not found");
  }

  // delete image from cloudinary
  if (donation.paymentProof?.publicId) {
    await deleteImageFromCloudinary(donation.paymentProof.publicId);
  }

  await donation.deleteOne();
};

/**
 * UPDATE STATUS
 */
const updateDonationStatusService = async ({ id, status }) => {
  const allowedStatus = ["pending", "approved", "rejected"];

  if (!allowedStatus.includes(status)) {
    throw new Error("Invalid status");
  }

  const donation = await Donation.findByIdAndUpdate(
    id,
    { status },
    {
      returnDocument: "after",
    }
  );

  if (!donation) {
    throw new Error("Donation not found");
  }

  return donation;
};

module.exports = {
  createDonationService,
  getAllDonationsService,
  deleteDonationService,
  updateDonationStatusService,
};
