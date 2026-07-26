import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import indiaData from "../data/indiaData";
import {
  FaUser,
  FaPhone,
  FaCity,
  FaMapMarkerAlt,
  FaTint,
  FaCheckCircle,
  FaCalendarAlt,
  FaLocationArrow,
  FaHashtag,
} from "react-icons/fa";

function RegisterDonor() {
  const API_URL = import.meta.env.VITE_API_URL;

  const initialFormData = {
    fullName: "",
    mobile: "",
    secondaryMobile: "",
    whatsapp: "",
    bloodGroup: "",
    state: "",
    city: "",
    area: "",
    pincode: "",
    dob: "",
    age: "",
    gender: "",
    donorType: "",
    lastDonationDate: "",
    nextEligibleDate: "",
    isEligible: false,
    emergencyAvailable: "",
    consentToContact: false,
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState("");
  const [locationFetched, setLocationFetched] = useState(false);
  const [locationMode, setLocationMode] = useState("current"); // "current" | "manual"
  const [formMessage, setFormMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const calculateNextEligibleDate = (lastDate) => {
    if (!lastDate) return "";

    const date = new Date(lastDate);
    date.setDate(date.getDate() + 120);

    return date.toISOString().split("T")[0];
  };

  const checkEligibility = (updatedData) => {
    const age = updatedData.dob ? calculateAge(updatedData.dob) : "";

    let isEligible = false;
    let nextEligibleDate = "";

    if (age >= 18) {
      if (updatedData.donorType === "First Time") {
        isEligible = true;
      }

      if (updatedData.donorType === "Repeat Donor") {
        nextEligibleDate = calculateNextEligibleDate(
          updatedData.lastDonationDate
        );

        if (nextEligibleDate) {
          const today = new Date();
          const eligibleDate = new Date(nextEligibleDate);
          isEligible = today >= eligibleDate;
        }
      }
    }

    return { age, isEligible, nextEligibleDate };
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let updatedData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    if (name === "mobile") {
      updatedData.whatsapp = value;
    }

    if (name === "state") {
      updatedData.city = "";
    }

    if (["dob", "donorType", "lastDonationDate"].includes(name)) {
      updatedData = {
        ...updatedData,
        ...checkEligibility(updatedData),
      };
    }

    setFormData(updatedData);
    setFormMessage("");
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
        setFormData((prev) => ({
          ...prev,
          area: "Current Location",
          pincode: "",
          location: {
            type: "Point",
            coordinates: [
              position.coords.longitude,
              position.coords.latitude,
            ],
          },
        }));

        setLocationFetched(true);
        setLocationStatus("Location added successfully ✅");
      },
      () => {
        setLocationFetched(false);
        setLocationStatus("Location permission denied ❌");
        setMessageType("error");
        setFormMessage(
          "Please allow location permission, or fill your Area and Pincode manually below."
        );
      }
    );
  };

  const handleLocationModeChange = (mode) => {
    setLocationMode(mode);
    setFormMessage("");

    if (mode === "manual") {
      setLocationFetched(false);
      setLocationStatus("");
      setFormData((prev) => ({
        ...prev,
        location: { type: "Point", coordinates: [0, 0] },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        area: "",
        pincode: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.consentToContact) {
      setMessageType("error");
      setFormMessage("Please accept contact consent.");
      return;
    }

    if (formData.age < 18) {
      setMessageType("error");
      setFormMessage("You are not eligible. Minimum age is 18 years.");
      return;
    }

    if (locationMode === "current") {
      if (!locationFetched) {
        setMessageType("error");
        setFormMessage(
          "Please tap 'Fetch Current Location' first, or switch to manual address entry."
        );
        return;
      }
    } else {
      if (!formData.area.trim() || !formData.pincode.trim()) {
        setMessageType("error");
        setFormMessage("Please fill your Area and Pincode.");
        return;
      }

      if (!/^\d{6}$/.test(formData.pincode.trim())) {
        setMessageType("error");
        setFormMessage("Please enter a valid 6 digit Pincode.");
        return;
      }
    }

    const payload = {
      ...formData,
      area: locationMode === "current" ? "Current Location" : formData.area.trim(),
      pincode: locationMode === "manual" ? formData.pincode.trim() : "",
      whatsapp: formData.mobile,
      emergencyAvailable: formData.isEligible
        ? formData.emergencyAvailable
        : "No",
    };

    try {
      setLoading(true);

      const res = await axios.post(`${API_URL}/api/donors/register`, payload);

      setMessageType(formData.isEligible ? "success" : "warning");

      if (formData.isEligible) {
        setFormMessage(res.data.message || "Donor registered successfully ✅");
      } else {
        setFormMessage(
          `⚠️ You are not eligible for now. We saved your details and recommend you for donation after ${formData.nextEligibleDate}.`
        );
      }

      setFormData(initialFormData);
      setLocationStatus("");
      setLocationFetched(false);
      setLocationMode("current");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Donor registration failed";

      setMessageType("error");

      if (
        msg.toLowerCase().includes("already") ||
        msg.toLowerCase().includes("duplicate") ||
        msg.toLowerCase().includes("e11000")
      ) {
        setFormMessage("⚠️ You are already registered as a donor.");
      } else {
        setFormMessage(msg);
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
          <p>Your one registration can help someone during a serious emergency.</p>

          <div className="donorPoints">
            <p><FaCheckCircle /> 18+ age eligibility</p>
            <p><FaCheckCircle /> 4 month donation gap check</p>
            <p><FaCheckCircle /> Nearby donor search</p>
          </div>
        </div>

        <div className="donorFormCard">
          <h2>Donor Registration</h2>
          <p>Fill your basic details.</p>

          {formData.dob && formData.age < 18 && (
            <p className="eligibilityBox notEligible">
              ❌ You are not eligible. Minimum age is 18 years.
            </p>
          )}

          {formData.dob &&
            formData.age >= 18 &&
            formData.donorType === "First Time" && (
              <p className="eligibilityBox eligible">
                ✅ Your age is {formData.age} years. You are eligible.
              </p>
            )}

          {formData.donorType === "Repeat Donor" &&
            formData.lastDonationDate &&
            formData.nextEligibleDate && (
              <p
                className={`eligibilityBox ${
                  formData.isEligible ? "eligible" : "notEligible"
                }`}
              >
                {formData.isEligible
                  ? "✅ You are eligible to donate blood."
                  : `⚠️ You are not eligible for now. We will recommend you after ${formData.nextEligibleDate}.`}
              </p>
            )}

          <form onSubmit={handleSubmit}>
            <div className="formGrid">
              <div className="inputGroup">
                <FaUser />
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                />
              </div>

              <div>
                <div className="inputGroup">
                  <FaPhone />
                  <input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    required
                  />
                </div>
                <p className="fieldHint">This number will be used for WhatsApp also.</p>
              </div>

              <div className="inputGroup">
                <FaTint />
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                >
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
                <FaMapMarkerAlt />
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select State</option>
                  {Object.keys(indiaData).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="inputGroup">
                <FaCity />
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  disabled={!formData.state}
                >
                  <option value="">Select City</option>
                  {formData.state &&
                    indiaData[formData.state]?.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <div className="inputGroup">
                  <FaCalendarAlt />
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
                <p className="fieldHint">
                  Enter your age by selecting your date of birth.
                </p>
              </div>

              <div className="inputGroup">
                <FaUser />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="inputGroup">
                <FaCheckCircle />
                <select
                  name="donorType"
                  value={formData.donorType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Donor Type</option>
                  <option>First Time</option>
                  <option>Repeat Donor</option>
                </select>
              </div>

              {formData.donorType === "Repeat Donor" && (
                <div>
                  <div className="inputGroup">
                    <FaCalendarAlt />
                    <input
                      type="date"
                      name="lastDonationDate"
                      value={formData.lastDonationDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <p className="fieldHint">
                    Enter your last blood donation date.
                  </p>
                </div>
              )}

              <div className="inputGroup">
                <FaCheckCircle />
                <select
                  name="emergencyAvailable"
                  value={formData.emergencyAvailable}
                  onChange={handleChange}
                  required
                  disabled={!formData.isEligible}
                >
                  <option value="">Available for Emergency?</option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>Emergency Only</option>
                </select>
              </div>

              <div className="locationModeBox fullWidth">
                <div className="searchTabs locationModeTabs">
                  <button
                    type="button"
                    className={locationMode === "current" ? "activeTab" : ""}
                    onClick={() => handleLocationModeChange("current")}
                  >
                    <FaLocationArrow /> Use Current Location
                  </button>
                  <button
                    type="button"
                    className={locationMode === "manual" ? "activeTab" : ""}
                    onClick={() => handleLocationModeChange("manual")}
                  >
                    <FaMapMarkerAlt /> Enter Address Manually
                  </button>
                </div>

                {locationMode === "current" ? (
                  <>
                    <button
                      type="button"
                      className="locationBtnSmall"
                      onClick={getCurrentLocation}
                    >
                      <FaLocationArrow /> Fetch Current Location
                    </button>

                    {locationStatus && (
                      <p className="locationStatus">{locationStatus}</p>
                    )}
                  </>
                ) : (
                  <div className="manualAddressGrid">
                    <div className="inputGroup">
                      <FaMapMarkerAlt />
                      <input
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        placeholder="Area / Locality"
                        required
                      />
                    </div>

                    <div className="inputGroup">
                      <FaHashtag />
                      <input
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                        maxLength="6"
                        inputMode="numeric"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              <label className="consent fullWidth">
                <input
                  type="checkbox"
                  name="consentToContact"
                  checked={formData.consentToContact}
                  onChange={handleChange}
                />
                I agree to be contacted for blood donation requests.
              </label>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register Donor"}
            </button>

            {formMessage && (
              <p className={`formMessage ${messageType}`}>{formMessage}</p>
            )}
          </form>
        </div>
      </motion.div>
    </section>
  );
}

export default RegisterDonor;