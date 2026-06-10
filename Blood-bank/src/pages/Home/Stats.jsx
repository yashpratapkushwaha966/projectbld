import { motion } from "framer-motion";
import { FaUsers, FaCity, FaClock, FaShieldAlt } from "react-icons/fa";

function Stats() {
  const data = [
    { icon: <FaUsers />, value: "MVP", label: "Donor Network Starting" },
    { icon: <FaCity />, value: "Bhopal", label: "First Target City" },
    { icon: <FaClock />, value: "24/7", label: "Emergency Request Flow" },
    { icon: <FaShieldAlt />, value: "Safe", label: "Consent Based Contact" },
  ];

  return (
    <section className="stats">
      {data.map((item, index) => (
        <motion.div className="statCard" key={index} initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.12 }} whileHover={{ y: -8 }}>
          <div className="statIcon">{item.icon}</div>
          <h2>{item.value}</h2>
          <p>{item.label}</p>
        </motion.div>
      ))}
    </section>
  );
}
export default Stats;
