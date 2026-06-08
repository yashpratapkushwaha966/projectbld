import { motion } from "framer-motion";
import { FaSearch, FaTint } from "react-icons/fa";

function BloodSearch() {
  const bloodGroups = [
    { group: "A+", fresh: 42, frozen: 18 },
    { group: "B+", fresh: 35, frozen: 12 },
    { group: "O+", fresh: 58, frozen: 26 },
    { group: "AB+", fresh: 14, frozen: 8 },
    { group: "A-", fresh: 9, frozen: 4 },
    { group: "O-", fresh: 7, frozen: 3 },
  ];

  return (
    <section className="section">
      <span className="badge">Blood Search</span>
      <h2>Search Fresh & Frozen Blood</h2>

      <div className="searchBox">
        <select>
          <option>Select Blood Group</option>
          <option>A+</option>
          <option>B+</option>
          <option>O+</option>
          <option>O-</option>
        </select>

        <select>
          <option>Need Type</option>
          <option>Fresh Blood</option>
          <option>Frozen Blood</option>
        </select>

        <input placeholder="Enter city or hospital name" />

        <button>
          <FaSearch /> Search
        </button>
      </div>

      <div className="bloodGrid">
        {bloodGroups.map((blood, index) => (
          <motion.div
            className="bloodCard"
            key={index}
            whileHover={{ scale: 1.04 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FaTint />
            <h3>{blood.group}</h3>
            <p>Fresh Blood: {blood.fresh} Units</p>
            <p>Frozen Blood: {blood.frozen} Units</p>
            <button>View Details</button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default BloodSearch;