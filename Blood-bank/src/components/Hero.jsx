import { motion } from "framer-motion";
import { FaHeartbeat, FaHospital, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      {/* Left Side */}
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
          BloodLink connects patients, donors, hospitals and blood banks
          to find fresh and frozen blood availability in emergencies.
        </p>

       <div className="heroBtns">
  <Link to="/blood-search">
    <button className="primaryBtn">
      Find Blood Now
    </button>
  </Link>

  <Link to="/register-donor">
    <button className="outlineBtn">
      Register Donor
    </button>
  </Link>
</div>
      </motion.div>

      {/* Right Side */}
      <motion.div
        className="heroBox"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <FaHeartbeat />

        <h3>Live Blood Network</h3>

        <div className="miniInfo">
          <p>
            <FaUserFriends /> Fresh Donors Available
          </p>

          <p>
            <FaHospital /> Hospital Blood Stock
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;