import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaTint,
  FaLocationArrow,
  FaSearch,
  FaCity,
} from "react-icons/fa";

const stateCityData = {
  "Madhya Pradesh": [
    "Bhopal",
    "Indore",
    "Jabalpur",
    "Gwalior",
    "Ujjain",
    "Sagar",
    "Rewa",
    "Satna",
    "Sehore",
    "Vidisha",
    "Raisen",
    "Dewas",
  ],
  "Uttar Pradesh": [
    "Lucknow",
    "Kanpur",
    "Prayagraj",
    "Varanasi",
    "Agra",
    "Noida",
    "Ghaziabad",
  ],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  Rajasthan: ["Jaipur", "Jodhpur", "Kota", "Ajmer", "Udaipur"],
  Delhi: ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
};

function BloodSearch() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [searchMode, setSearchMode] = useState("nearby");
  const [bloodGroup, setBloodGroup] = useState("");

  const [manualFilters, setManualFilters] = useState({
    state: "",
    city: "",
    bloodGroup: "",
  });

  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const getLastDonationText = (date) => {
    if (!date) return "Not provided";

    const lastDate = new Date(date);
    const today = new Date();

    if (isNaN(lastDate.getTime())) return "Not provided";

    const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Invalid future date";
    if (diffDays === 0) return "Today";
    if (diffDays < 30) return `${diffDays} days ago`;

    const months = Math.floor(diffDays / 30);
    if (months < 12) return `${months} months ago`;

    return `${Math.floor(months / 12)} years ago`;
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

  const handleManualChange = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      setManualFilters({
        ...manualFilters,
        state: value,
        city: "",
      });
      return;
    }

    setManualFilters({
      ...manualFilters,
      [name]: value,
    });
  };

  const nearbySearchDonors = async () => {
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

        const res = await axios.get(`${API_URL}/api/donors/nearby`, {
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

  const manualSearchDonors = async () => {
    if (!manualFilters.state || !manualFilters.city || !manualFilters.bloodGroup) {
      alert("Please select state, city and blood group.");
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      setDonors([]);
      setStatusMsg("Searching donors by state and city...");

      const res = await axios.get(`${API_URL}/api/donors/search`, {
        params: manualFilters,
      });

      const foundDonors = res.data.donors || [];
      setDonors(foundDonors);

      if (foundDonors.length > 0) {
        setStatusMsg(
          `${foundDonors.length} donor(s) found in ${manualFilters.city}, ${manualFilters.state}`
        );
      } else {
        setStatusMsg("No donors found for selected state and city.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Manual search failed");
      setStatusMsg("");
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = (mode) => {
    setSearchMode(mode);
    setDonors([]);
    setSearched(false);
    setStatusMsg("");
  };

  return (
    <section className="pageShell">
      <div className="pageHeader">
        <span className="badge">Find Donor</span>
        <h1>Search Blood Donors</h1>
        <p>
          Search nearby donors using GPS or manually find donors by State, City
          and Blood Group.
        </p>
      </div>

      <div className="searchTabs">
        <button
          className={searchMode === "nearby" ? "activeTab" : ""}
          onClick={() => resetSearch("nearby")}
        >
          <FaLocationArrow /> Nearby Search
        </button>

        <button
          className={searchMode === "manual" ? "activeTab" : ""}
          onClick={() => resetSearch("manual")}
        >
          <FaCity /> Manual Search
        </button>
      </div>

      {searchMode === "nearby" && (
        <motion.div
          className="searchPanel"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
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

          <button onClick={nearbySearchDonors} disabled={loading}>
            <FaLocationArrow />{" "}
            {loading ? "Searching..." : "Use Location & Search"}
          </button>
        </motion.div>
      )}

      {searchMode === "manual" && (
        <motion.div
          className="manualSearchPanel"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <select
            name="state"
            value={manualFilters.state}
            onChange={handleManualChange}
          >
            <option value="">Select State</option>
            {Object.keys(stateCityData).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select
            name="city"
            value={manualFilters.city}
            onChange={handleManualChange}
            disabled={!manualFilters.state}
          >
            <option value="">Select City</option>
            {manualFilters.state &&
              stateCityData[manualFilters.state]?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>

          <select
            name="bloodGroup"
            value={manualFilters.bloodGroup}
            onChange={handleManualChange}
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

          <button onClick={manualSearchDonors} disabled={loading}>
            <FaSearch /> {loading ? "Searching..." : "Search Donor"}
          </button>
        </motion.div>
      )}

      {statusMsg && (
        <p style={{ textAlign: "center", marginBottom: "30px", fontWeight: "800" }}>
          {statusMsg}
        </p>
      )}

      {searched && !loading && donors.length === 0 && (
        <p style={{ textAlign: "center", marginBottom: "30px" }}>
          No donor found. Try another blood group or location.
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