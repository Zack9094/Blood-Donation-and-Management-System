const mongoose = require("mongoose");

const donationHistorySchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    donationDate: {
      type: Date,
      required: true,
    },

    hospital: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    donationType: {
      type: String,
      enum: ["Whole Blood", "Platelets", "Plasma"],
      default: "Whole Blood",
    },

    status: {
      type: String,
      enum: ["Completed", "Pending Verification", "Rejected"],
      default: "Pending Verification",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "DonationHistory",
  donationHistorySchema
);