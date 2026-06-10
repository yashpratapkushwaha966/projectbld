import { motion } from "framer-motion";
import { FaHeartbeat, FaMapMarkerAlt, FaPhoneAlt, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <motion.div className="heroContent" initial={{ opacity: 0, x: -70 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
        <span className="badge">Emergency Blood Donor Network</span>
        <h1>Find Blood Donors <br /> Near You Fast.</h1>
        <p>Project BLD helps patients connect with nearby blood donors during emergency needs. Search by blood group, city and area.</p>

        <div className="heroBtns">
          <Link to="/blood-search"><button className="primaryBtn">Find Donor Now</button></Link>
          <Link to="/register-donor"><button className="outlineBtn">Register as Donor</button></Link>
        </div>

        <div className="trustRow">
          <span><FaUserShield /> Verified donor focus</span>
          <span><FaPhoneAlt /> Direct call/WhatsApp</span>
          <span><FaMapMarkerAlt /> Local city search</span>
        </div>
      </motion.div>

      <motion.div className="heroVisual" initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }}>
        <div className="pulseCircle"></div>
        <FaHeartbeat className="heartIcon" />
        <div className="liveCard top"><b>O+ Donor Found</b><span>MP Nagar, Bhopal</span></div>
        <div className="liveCard bottom"><b>Emergency Request</b><span>2 units needed today</span></div>
      </motion.div>
    </section>
  );
}
export default Hero;
