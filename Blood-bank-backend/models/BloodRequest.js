const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    bloodGroupNeeded: { type: String, required: true },
    unitsRequired: { type: Number, required: true },
    hospitalName: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    contactNumber: { type: String, required: true },
    urgency: { type: String, default: "Emergency" },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);