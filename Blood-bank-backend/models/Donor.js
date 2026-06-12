const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },

    mobile: { type: String, required: true, unique: true, trim: true },

    whatsapp: { type: String, trim: true },

    bloodGroup: { type: String, required: true },

    profilePhoto: { type: String },

    city: { type: String, required: true, trim: true },

    area: { type: String, required: true, trim: true },

    age: { type: Number, required: true },

    gender: { type: String, required: true },

    lastDonationDate: { type: Date },

    emergencyAvailable: {
      type: String,
      enum: ["Yes", "No", "Emergency Only"],
      default: "Yes",
    },

    isVerified: { type: Boolean, default: false },

    consentToContact: { type: Boolean, default: true },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },
  },
  { timestamps: true }
);

donorSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Donor", donorSchema);