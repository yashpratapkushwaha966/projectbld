import { motion } from "framer-motion";
import { FaHospitalAlt, FaMapMarkerAlt } from "react-icons/fa";

function Hospitals() {
  const hospitals = [
    "AIIMS Bhopal",
    "City Blood Bank",
    "Life Care Hospital",
  ];

  return (
    <section className="section light">
      <span className="badge">Hospital Network</span>
      <h2>Connected Hospitals & Blood Banks</h2>

      <div className="hospitalGrid">
        {hospitals.map((hospital, index) => (
          <motion.div
            className="hospitalCard"
            key={index}
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaHospitalAlt />
            <h3>{hospital}</h3>
            <p>
              <FaMapMarkerAlt /> Bhopal, Madhya Pradesh
            </p>
            <p>Fresh & Frozen Blood Available</p>
            <button>Check Stock</button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Hospitals;