const express = require("express");
const { sendOtp, verifyOtp, me } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/me", protect, me);

module.exports = router;
