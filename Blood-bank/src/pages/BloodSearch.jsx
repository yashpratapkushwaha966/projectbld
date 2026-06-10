import { motion } from "framer-motion";
import { FaSearch, FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt, FaTint, FaCheckCircle } from "react-icons/fa";

function BloodSearch() {
  const donors = [
    { name: "Rahul Sharma", group: "O+", area: "MP Nagar", city: "Bhopal", lastDonation: "4 months ago", status: "Available", verified: true },
    { name: "Priya Verma", group: "A+", area: "Rohit Nagar", city: "Bhopal", lastDonation: "5 months ago", status: "Available", verified: true },
    { name: "Amit Patel", group: "B-", area: "Saket Nagar", city: "Bhopal", lastDonation: "6 months ago", status: "Emergency Only", verified: false },
  ];

  return (
    <section className="pageShell">
      <div className="pageHeader">
        <span className="badge">Find Donor</span>
        <h1>Search Blood Donors Near You</h1>
        <p>Use filters to find nearby donors. Backend search will be connected later.</p>
      </div>

      <motion.div className="searchPanel" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }}>
        <select>
          <option>Select Blood Group</option>
          <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
          <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
        </select>
        <input placeholder="City e.g. Bhopal" />
        <input placeholder="Area e.g. MP Nagar" />
        <button><FaSearch /> Search Donor</button>
      </motion.div>

      <div className="donorGrid">
        {donors.map((donor, index) => (
          <motion.div className="donorCard" key={index} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }} whileHover={{ y: -8 }}>
            <div className="donorTop">
              <div className="avatar">{donor.name.charAt(0)}</div>
              <div>
                <h3>{donor.name}</h3>
                <p><FaMapMarkerAlt /> {donor.area}, {donor.city}</p>
              </div>
              <div className="groupBadge"><FaTint /> {donor.group}</div>
            </div>
            <div className="donorMeta">
              <span>Last Donation: {donor.lastDonation}</span>
              <span>Status: {donor.status}</span>
              <span>{donor.verified ? <FaCheckCircle /> : "○"} {donor.verified ? "Verified" : "Not Verified"}</span>
            </div>
            <div className="donorActions">
              <button><FaPhoneAlt /> Call</button>
              <button className="whatsappBtn"><FaWhatsapp /> WhatsApp</button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
export default BloodSearch;
