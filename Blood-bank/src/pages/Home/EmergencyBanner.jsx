import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function EmergencyBanner() {
  return (
    <section className="emergency">
      <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span>Emergency Mode</span>
        <h2>Need Blood Urgently?</h2>
        <p>Post your requirement or search nearby donors in minutes.</p>
        <div className="emergencyBtns">
          <Link to="/blood-search"><button>Find Donor</button></Link>
          <Link to="/register-donor"><button className="whiteOutline">Become Donor</button></Link>
        </div>
      </motion.div>
    </section>
  );
}
export default EmergencyBanner;
