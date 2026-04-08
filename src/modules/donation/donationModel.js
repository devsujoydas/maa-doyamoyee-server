const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      trim: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    phone: { type: String, trim: true },

    donationAmount: { type: Number, required: true, min: 1 },
    paymentScreenshot: { type: String }, 
    optionalMessage: { type: String, trim: true },

    paymentMethod: { 
      type: String, 
      enum: ["bank transfer", "mobile banking"], 
      required: true 
    },

    bankDetails: {
      bankName: { type: String, trim: true },
      branchName: { type: String, trim: true },
      branchCode: { type: String, trim: true },
      SWIFTCode: { type: String, trim: true },
      routingNumber: { type: String, trim: true },
      senderAccountNumber: { type: String, trim: true },
    },

    mobileBankingDetails: {
      selectMobileBanking: { type: String, enum: ["bkash", "nagad", "rocket"] },
      senderMobileNumber: { type: String, trim: true },
      transactionId: { type: String, trim: true, unique: true },
    },
  },
  { timestamps: true }
);

// Validation before saving
DonationSchema.pre("save", function (next) {
  if (this.paymentMethod === "bank transfer") {
    if (!this.bankDetails?.bankName || !this.bankDetails?.senderAccountNumber) {
      return next(new Error("Bank details required for bank transfer"));
    }
  } else if (this.paymentMethod === "mobile banking") {
    if (!this.mobileBankingDetails?.selectMobileBanking || 
        !this.mobileBankingDetails?.transactionId ||
        !this.mobileBankingDetails?.senderMobileNumber) {
      return next(new Error("Mobile banking details required"));
    }
  }
  next();
});

module.exports = mongoose.model("Donation", DonationSchema);