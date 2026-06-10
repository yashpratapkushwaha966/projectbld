import { motion } from "framer-motion";
import { FaHospitalAlt, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

function Hospitals() {
  const hospitals = [
    { name: "AIIMS Bhopal", area: "Saket Nagar", type: "Government Hospital" },
    { name: "Hamidia Hospital", area: "Royal Market", type: "Government Hospital" },
    { name: "Bhopal Memorial Hospital", area: "Karond", type: "Multi Speciality Hospital" },
  ];

  return (
    <section className="pageShell lightPage">
      <div className="pageHeader">
        <span className="badge">Hospital Network</span>
        <h1>Hospitals & Blood Banks</h1>
        <p>In backend phase, hospitals will update blood stock from their dashboard.</p>
      </div>

      <div className="cardGrid">
        {hospitals.map((hospital, index) => (
          <motion.div className="infoCard hospitalBigCard" key={index} initial={{ opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
            <div className="cardIcon"><FaHospitalAlt /></div>
            <h3>{hospital.name}</h3>
            <p><FaMapMarkerAlt /> {hospital.area}, Bhopal</p>
            <small>{hospital.type}</small>
            <button><FaPhoneAlt /> Contact Info</button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
export default Hospitals;
