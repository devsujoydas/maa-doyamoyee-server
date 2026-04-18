const mongoose = require("mongoose");

/**
 * BANK PAYMENT (SIMPLIFIED)
 */
const BankPaymentSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true },
  bankName: { type: String, required: true },
});

/**
 * MOBILE PAYMENT
 */
const MobilePaymentSchema = new mongoose.Schema({
  provider: {
    type: String,
    enum: ["Nagad", "Bkash", "Rocket", "TapTapSend"],
    required: true,
  },
  senderNumber: { type: String, required: true },
  transactionId: { type: String, required: true },
});

/**
 * PAYMENT PROOF (image upload)
 */
const PaymentProofSchema = new mongoose.Schema({
  url: String,
  publicId: String,
});

/**
 * MAIN DONATION SCHEMA
 */
const DonationSchema = new mongoose.Schema(
  {
    accountName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    paymentAmount: {
      type: Number,
      required: true,
      min: 1,
    },

    message: {
      type: String,
      default: "",
    },

    paymentMethod: {
      type: String,
      enum: ["Bank", "MobileBanking"],
      required: true,
    },

    paymentProof: PaymentProofSchema,

    bankPayment: {
      type: BankPaymentSchema,
      required: function () {
        return this.paymentMethod === "Bank";
      },
    },

    mobilePayment: {
      type: MobilePaymentSchema,
      required: function () {
        return this.paymentMethod === "MobileBanking";
      },
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", DonationSchema);