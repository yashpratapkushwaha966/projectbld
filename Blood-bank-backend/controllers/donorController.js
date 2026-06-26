const Donor = require("../models/Donor");

// Donor Register
exports.registerDonor = async (req, res) => {
  try {
    const existingDonor = await Donor.findOne({
      mobile: req.body.mobile,
    });

    if (existingDonor) {
      return res.status(400).json({
        success: false,
        message: "You are already registered as a donor.",
      });
    }

    const donor = await Donor.create(req.body);

    res.status(201).json({
      success: true,
      message: "Donor registered successfully",
      donor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Donor registration failed",
      error: error.message,
    });
  }
};

// Get All Donors
exports.getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: donors.length,
      donors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get donors",
      error: error.message,
    });
  }
};

// Manual Search: state + city + bloodGroup
exports.searchDonors = async (req, res) => {
  try {
    let { bloodGroup, state, city } = req.query;

    const query = {
      consentToContact: true,
      emergencyAvailable: { $in: ["Yes", "Emergency Only"] },
    };

    if (bloodGroup) {
      bloodGroup = bloodGroup.trim().replace(" ", "+");
      query.bloodGroup = bloodGroup;
    }

    if (state) {
      query.state = new RegExp(state.trim(), "i");
    }

    if (city) {
      query.city = new RegExp(city.trim(), "i");
    }

    const donors = await Donor.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      searchType: "manual",
      count: donors.length,
      donors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Manual donor search failed",
      error: error.message,
    });
  }
};

// Nearby Search: GPS + Radius Search
exports.getNearbyDonors = async (req, res) => {
  try {
    let { latitude, longitude, bloodGroup, radius } = req.query;

    if (!latitude || !longitude || !bloodGroup) {
      return res.status(400).json({
        success: false,
        message: "latitude, longitude and bloodGroup are required",
      });
    }

    latitude = Number(latitude);
    longitude = Number(longitude);
    radius = Number(radius) || 5000;

    bloodGroup = bloodGroup.trim().replace(" ", "+");

    const donors = await Donor.find({
      bloodGroup,
      consentToContact: true,
      emergencyAvailable: { $in: ["Yes", "Emergency Only"] },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: radius,
        },
      },
    });

    res.status(200).json({
      success: true,
      searchType: "nearby",
      radius,
      radiusInKm: radius / 1000,
      count: donors.length,
      donors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Nearby donor search failed",
      error: error.message,
    });
  }
};