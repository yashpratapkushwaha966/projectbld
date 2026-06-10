import { motion } from "framer-motion";
import { FaHospitalAlt, FaMapMarkerAlt } from "react-icons/fa";

function HospitalPreview() {
  const hospitals = ["AIIMS Bhopal", "Bhopal Memorial Hospital", "Hamidia Hospital"];

  return (
    <section className="section">
      <span className="badge">Future Hospital Network</span>
      <h2>Hospital & Blood Bank Partners</h2>
      <div className="cardGrid">
        {hospitals.map((hospital, index) => (
          <motion.div className="infoCard" key={index} initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
            <div className="cardIcon"><FaHospitalAlt /></div>
            <h3>{hospital}</h3>
            <p><FaMapMarkerAlt /> Bhopal, Madhya Pradesh</p>
            <small>Hospital dashboard will be added in backend phase.</small>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
export default HospitalPreview;
