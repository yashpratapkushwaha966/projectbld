import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaUser,
  FaPhone,
  FaCity,
  FaTint,
  FaCheckCircle,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaCamera,
  FaCalendarAlt,
  FaLocationArrow,
} from "react-icons/fa";

function RegisterDonor() {
  const initialFormData = {
    fullName: "",
    mobile: "",
    whatsapp: "",
    bloodGroup: "",
    city: "",
    area: "",
    age: "",
    gender: "",
    lastDonationDate: "",
    emergencyAvailable: "",
    profilePhoto: "",
    consentToContact: false,
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormMessage("");

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]?.name
          : value,
    });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setMessageType("error");
      setFormMessage("Geolocation is not supported by your browser.");
      return;
    }

    setLocationStatus("Getting location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setFormData((prev) => ({
          ...prev,
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        }));

        setLocationStatus("Location added successfully ✅");
      },
      () => {
        setLocationStatus("Location permission denied ❌");
        setMessageType("error");
        setFormMessage("Please allow location permission for nearby donor search.");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.consentToContact) {
      setMessageType("error");
      setFormMessage("Please accept contact consent.");
      return;
    }

    try {
      setLoading(true);
      setFormMessage("");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/donors/register`,
        formData
      );

      setMessageType("success");
      setFormMessage(res.data.message || "Donor registered successfully ✅");

      setFormData(initialFormData);
      setLocationStatus("");
    } catch (error) {
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Donor registration failed";

      setMessageType("error");

      if (
        backendMessage.toLowerCase().includes("already") ||
        backendMessage.toLowerCase().includes("duplicate") ||
        backendMessage.toLowerCase().includes("e11000")
      ) {
        setFormMessage("⚠️ You are already registered as a donor.");
      } else {
        setFormMessage(backendMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="donorPage">
      <motion.div
        className="donorWrapper"
        initial={{ opacity: 0, y: 45 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="donorLeft">
          <span className="badgeWhite">Become a Life Saver</span>
          <h1>Register as a Blood Donor</h1>
          <p>
            Your one registration can help someone during a serious emergency.
            We only collect necessary details and contact consent.
          </p>

          <div className="donorPoints">
            <p><FaCheckCircle /> Nearby emergency requests</p>
            <p><FaCheckCircle /> Consent based donor contact</p>
            <p><FaCheckCircle /> City and area based search</p>
          </div>
        </div>

        <div className="donorFormCard">
          <h2>Donor Registration</h2>
          <p>Fill your basic details. Backend will save this data.</p>

          <form onSubmit={handleSubmit}>
            <div className="formGrid">
              <div className="inputGroup">
                <FaUser />
                <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
              </div>

              <div className="inputGroup">
                <FaPhone />
                <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" required />
              </div>

              <div className="inputGroup">
                <FaWhatsapp />
                <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp Number" />
              </div>

              <div className="inputGroup">
                <FaTint />
                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
                  <option value="">Select Blood Group</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>O+</option>
                  <option>O-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </div>

              <div className="inputGroup">
                <FaCity />
                <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
              </div>

              <div className="inputGroup">
                <FaMapMarkerAlt />
                <input name="area" value={formData.area} onChange={handleChange} placeholder="Area / Locality" required />
              </div>

              <div className="inputGroup">
                <FaUser />
                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required />
              </div>

              <div className="inputGroup">
                <FaUser />
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="inputGroup">
                <FaCalendarAlt />
                <input type="date" name="lastDonationDate" value={formData.lastDonationDate} onChange={handleChange} />
              </div>

              <div className="inputGroup">
                <FaCheckCircle />
                <select name="emergencyAvailable" value={formData.emergencyAvailable} onChange={handleChange} required>
                  <option value="">Available for Emergency?</option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>Emergency Only</option>
                </select>
              </div>

              <div className="inputGroup fullWidth">
                <FaCamera />
                <input type="file" name="profilePhoto" onChange={handleChange} />
              </div>

              <button type="button" className="locationBtn fullWidth" onClick={getCurrentLocation}>
                <FaLocationArrow /> Use Current Location
              </button>

              {locationStatus && (
                <p className="locationStatus fullWidth">{locationStatus}</p>
              )}

              <label className="consent fullWidth">
                <input type="checkbox" name="consentToContact" checked={formData.consentToContact} onChange={handleChange} />
                I agree to be contacted for blood donation requests.
              </label>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register Donor"}
            </button>

            {formMessage && (
              <p className={`formMessage ${messageType}`}>
                {formMessage}
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </section>
  );
}

export default RegisterDonor;