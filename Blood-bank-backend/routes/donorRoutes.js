const express = require("express");

const {
  registerDonor,
  getAllDonors,
  searchDonors,
  getNearbyDonors,
} = require("../controllers/donorController");

const router = express.Router();

// Register Donor
router.post("/register", registerDonor);

// Get All Donors
router.get("/", getAllDonors);

// Normal Search
router.get("/search", searchDonors);

// Nearby Search (GPS Based)
router.get("/nearby", getNearbyDonors);

module.exports = router;