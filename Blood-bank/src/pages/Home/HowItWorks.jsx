import { motion } from "framer-motion";
import { FaSearch, FaWhatsapp, FaHandHoldingHeart } from "react-icons/fa";

function HowItWorks() {
  const steps = [
    { icon: <FaSearch />, title: "Search Donor", desc: "Choose blood group, city and nearby area." },
    { icon: <FaWhatsapp />, title: "Contact Instantly", desc: "Call or WhatsApp available donors directly." },
    { icon: <FaHandHoldingHeart />, title: "Save Life", desc: "Get help faster during urgent blood needs." }
  ];

  return (
    <section className="section">
      <span className="badge">How It Works</span>
      <h2>Simple Emergency Flow</h2>
      <div className="cardGrid">
        {steps.map((step, index) => (
          <motion.div className="infoCard" key={index} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }} whileHover={{ y: -10 }}>
            <div className="cardIcon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
export default HowItWorks;
