const BloodRequest = require("../models/BloodRequest");

exports.createRequest = async (req, res) => {
  try {
    const bloodRequest = await BloodRequest.create(req.body);

    res.status(201).json({
      success: true,
      message: "Blood request created successfully",
      bloodRequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Request creation failed",
      error: error.message,
    });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get requests",
      error: error.message,
    });
  }
};