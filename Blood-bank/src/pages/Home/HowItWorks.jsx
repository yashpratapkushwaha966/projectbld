import { motion } from "framer-motion";
import { FaSearch, FaHospital, FaUserFriends } from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      icon: <FaSearch />,
      title: "Search Blood",
      desc: "Select blood group and city."
    },
    {
      icon: <FaHospital />,
      title: "Check Availability",
      desc: "View fresh and frozen blood stock."
    },
    {
      icon: <FaUserFriends />,
      title: "Connect Instantly",
      desc: "Contact donor or hospital directly."
    }
  ];

  return (
    <section className="section">
      <span className="badge">How It Works</span>
      <h2>Save Life In 3 Steps</h2>

      <div className="hospitalGrid">
        {steps.map((step, index) => (
          <motion.div
            className="hospitalCard"
            key={index}
            whileHover={{ y: -10 }}
          >
            {step.icon}
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;