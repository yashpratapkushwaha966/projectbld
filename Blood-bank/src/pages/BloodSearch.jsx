import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaTint,
  FaCheckCircle,
  FaLocationArrow,
} from "react-icons/fa";

function BloodSearch() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const getLastDonationText = (date) => {
    if (!date) return "Not provided";

    const lastDate = new Date(date);
    const today = new Date();

    const diffTime = today - lastDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);

    if (diffDays <= 0) return "Today";
    if (months <= 0) return `${diffDays} days ago`;
    return `${months} months ago`;
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Location is not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          reject("Location permission denied. Please allow location access.");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  const searchDonors = async () => {
    if (!bloodGroup) {
      alert("Please select blood group.");
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      setDonors([]);

      setStatusMsg("Getting your current location...");
      const location = await getCurrentLocation();

      const radiusList = [5000, 10000, 20000, 50000];

      for (const radius of radiusList) {
        setStatusMsg(`Searching donors within ${radius / 1000} KM...`);

        const res = await axios.get("http://localhost:5000/api/donors/nearby", {
          params: {
            latitude: location.latitude,
            longitude: location.longitude,
            bloodGroup,
            radius,
          },
        });

        const foundDonors = res.data.donors || [];

        if (foundDonors.length > 0) {
          setDonors(foundDonors);
          setStatusMsg(
            `${foundDonors.length} donor(s) found within ${radius / 1000} KM`
          );
          return;
        }
      }

      setStatusMsg("No donors found within 50 KM.");
    } catch (error) {
      alert(error.response?.data?.message || error || "Failed to search donors");
      setStatusMsg("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pageShell">
      <div className="pageHeader">
        <span className="badge">Find Donor</span>
        <h1>Nearby Blood Donor Search</h1>
        <p>
          Select blood group and allow location. Project BLD will search donors
          from 5 KM to 50 KM automatically.
        </p>
      </div>

      <motion.div
        className="searchPanel"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
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

        <button onClick={searchDonors} disabled={loading}>
          <FaLocationArrow /> {loading ? "Searching..." : "Use Location & Search"}
        </button>
      </motion.div>

      {statusMsg && (
        <p style={{ textAlign: "center", marginBottom: "30px", fontWeight: "800" }}>
          {statusMsg}
        </p>
      )}

      {searched && !loading && donors.length === 0 && (
        <p style={{ textAlign: "center", marginBottom: "30px" }}>
          No donor found nearby. Try another blood group.
        </p>
      )}

      <div className="donorGrid">
        {donors.map((donor, index) => (
          <motion.div
            className="donorCard"
            key={donor._id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 }}
            whileHover={{ y: -8 }}
          >
            <div className="donorTop">
              <div className="avatar">
                {donor.fullName?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3>{donor.fullName}</h3>
                <p>
                  <FaMapMarkerAlt /> {donor.area}, {donor.city}
                </p>
              </div>

              <div className="groupBadge">
                <FaTint /> {donor.bloodGroup}
              </div>
            </div>

            <div className="donorMeta">
              <span>
                Last Donation: {getLastDonationText(donor.lastDonationDate)}
              </span>

              <span>Status: {donor.emergencyAvailable}</span>

              <span>
                {donor.isVerified ? <FaCheckCircle /> : "○"}{" "}
                {donor.isVerified ? "Verified" : "Not Verified"}
              </span>
            </div>

            <div className="donorActions">
              <a href={`tel:${donor.mobile}`}>
                <button>
                  <FaPhoneAlt /> Call
                </button>
              </a>

              <a
                href={`https://wa.me/91${donor.whatsapp || donor.mobile}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="whatsappBtn">
                  <FaWhatsapp /> WhatsApp
                </button>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default BloodSearch;