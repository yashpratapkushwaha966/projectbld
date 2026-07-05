const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Otp = require("../models/Otp");
const sendEmail = require("../utils/sendEmail");

const createOtp = () => String(Math.floor(100000 + Math.random() * 900000));
const hashOtp = (otp) => crypto.createHash("sha256").update(otp).digest("hex");

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

exports.sendOtp = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required.",
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const otp = createOtp();

    await Otp.deleteMany({ email: cleanEmail });

    await Otp.create({
      name: name.trim(),
      email: cleanEmail,
      otpHash: hashOtp(otp),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendEmail({
      to: cleanEmail,
      subject: "Project BLD Login OTP",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
          <h2>Project BLD Login OTP</h2>
          <p>Hello ${name.trim()},</p>
          <p>Your login OTP is:</p>
          <h1 style="letter-spacing:6px;color:#b91c1c">${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent to your email.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send OTP. Check SMTP env variables.",
      error: error.message,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const otpRecord = await Otp.findOne({ email: cleanEmail });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP expired. Please request a new OTP.",
      });
    }

    if (otpRecord.attempts >= 5) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({
        success: false,
        message: "Too many wrong attempts. Please request a new OTP.",
      });
    }

    if (otpRecord.otpHash !== hashOtp(String(otp))) {
      otpRecord.attempts += 1;
      await otpRecord.save();
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    const user = await User.findOneAndUpdate(
      { email: cleanEmail },
      {
        name: otpRecord.name,
        email: cleanEmail,
        isVerified: true,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    await Otp.deleteOne({ _id: otpRecord._id });

    const token = createToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "OTP verification failed.",
      error: error.message,
    });
  }
};

exports.me = async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
};
