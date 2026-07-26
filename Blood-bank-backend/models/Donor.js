const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
  {
    // ==========================
    // Personal Information
    // ==========================
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    secondaryMobile: {
     type: String,
     trim: true,
    },

    whatsapp: {
      type: String,
      trim: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },

    // ==========================
    // Date of Birth
    // ==========================
    dob: {
      type: Date,
      required: true,
    },

    // Auto calculated from frontend
    age: {
      type: Number,
      required: true,
    },

    // ==========================
    // Address
    // ==========================

    state: {
  type: String,
  required: true,
  trim: true,
},

    city: {
      type: String,
      required: true,
      trim: true,
    },

    area: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      trim: true,
      default: "",
    },

    // ==========================
    // Donor Details
    // ==========================
    donorType: {
      type: String,
      enum: ["First Time", "Repeat Donor"],
      required: true,
    },

    lastDonationDate: {
      type: Date,
    },

    // Automatically calculated
    nextEligibleDate: {
      type: Date,
    },

    // Eligibility Status
    isEligible: {
      type: Boolean,
      default: false,
    },

    emergencyAvailable: {
      type: String,
      enum: ["Yes", "No", "Emergency Only"],
      default: "Yes",
    },

    // ==========================
    // Verification
    // ==========================
    isVerified: {
      type: Boolean,
      default: false,
    },

    consentToContact: {
      type: Boolean,
      default: true,
    },

    // ==========================
    // Profile Image
    // ==========================
    profilePhoto: {
      type: String,
      default: "",
    },

    // ==========================
    // Geo Location
    // ==========================
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
  {
    timestamps: true,
  }
);

// Geo Index
donorSchema.index({
  location: "2dsphere",
});

module.exports = mongoose.model("Donor", donorSchema);