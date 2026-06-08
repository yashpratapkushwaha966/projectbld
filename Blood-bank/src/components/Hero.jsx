import { motion } from "framer-motion";
import { FaHeartbeat, FaHospital, FaUserFriends } from "react-icons/fa";

function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="heroContent"
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="badge">Emergency Blood Help Platform</span>

        <h1>
          Find Blood Fast. <br />
          Save Lives Faster.
        </h1>

        <p>
          BloodLink connects patients, donors, hospitals and blood banks to find
          fresh and frozen blood availability in emergency.
        </p>

        <div className="heroBtns">
          <button className="primaryBtn">Find Blood Now</button>
          <button className="outlineBtn">Register Donor</button>
        </div>
      </motion.div>

      <motion.div
        className="heroBox"
        initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8 }}
      >
        <FaHeartbeat />
        <h3>Live Blood Network</h3>

        <div className="miniInfo">
          <p>
            <FaUserFriends /> Fresh Donors
          </p>
          <p>
            <FaHospital /> Hospital Stock
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;