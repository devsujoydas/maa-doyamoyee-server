const mongoose = require("mongoose");

const BankPaymentSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true },
  bankName: { type: String, required: true },
  branchName: { type: String, required: true },
  branchCode: { type: String, required: true },
  swiftCode: { type: String },
  routingNumber: { type: String },
});

const MobilePaymentSchema = new mongoose.Schema({
  provider: {
    type: String,
    enum: ["Nagad", "Bkash", "Rocket", "TapTapSend"],
    required: true,
  },
  senderNumber: { type: String, required: true },
  transactionId: { type: String, required: true },
});

const PaymentProofSchema = new mongoose.Schema({
  url: String,
  publicId: String,
});

const DonationSchema = new mongoose.Schema(
  {
    accountName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    paymentAmount: { type: Number, required: true },
    message: String,

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