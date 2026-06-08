import { motion } from "framer-motion";

function EmergencyBanner() {
  return (
    <section className="emergency">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <h2>Need Blood Urgently?</h2>
        <p>
          Search nearby donors and hospitals instantly.
        </p>

        <button>Search Now</button>
      </motion.div>
    </section>
  );
}

export default EmergencyBanner;