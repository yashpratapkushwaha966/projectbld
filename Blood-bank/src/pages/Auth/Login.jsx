import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaUser, FaTint } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [step, setStep] = useState("email");
  const [form, setForm] = useState({ name: "", email: "", otp: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const sendOtp = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      setMessageType("error");
      setMessage("Please enter name and email.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/auth/send-otp`, {
        name: form.name,
        email: form.email,
      });

      setStep("otp");
      setMessageType("success");
      setMessage(res.data.message || "OTP sent to your email.");
    } catch (error) {
      setMessageType("error");
      setMessage(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    if (!form.otp.trim()) {
      setMessageType("error");
      setMessage("Please enter OTP.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/auth/verify-otp`, {
        email: form.email,
        otp: form.otp,
      });

      login({ token: res.data.token, user: res.data.user });
      navigate(location.state?.from || "/blood-search", { replace: true });
    } catch (error) {
      setMessageType("error");
      setMessage(error.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="authPage">
      <motion.div
        className="authCard"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="authLogo"><FaTint /></div>
        <span className="badge">Secure Login</span>
        <h1>Login with Email OTP</h1>
        <p>Only logged-in users can find blood donors.</p>

        {step === "email" ? (
          <form onSubmit={sendOtp}>
            <div className="inputGroup">
              <FaUser />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>

            <div className="inputGroup">
              <FaEnvelope />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp}>
            <div className="inputGroup">
              <FaLock />
              <input
                name="otp"
                value={form.otp}
                onChange={handleChange}
                placeholder="Enter 6 digit OTP"
                maxLength="6"
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Login"}
            </button>

            <button
              type="button"
              className="secondaryBtn"
              onClick={() => setStep("email")}
            >
              Change Email
            </button>
          </form>
        )}

        {message && <p className={`formMessage ${messageType}`}>{message}</p>}
      </motion.div>
    </section>
  );
}

export default Login;
