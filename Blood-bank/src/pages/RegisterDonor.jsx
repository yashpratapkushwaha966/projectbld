import { motion } from "framer-motion";

function RegisterDonor() {
  return (
    <section className="donorSection">
      <motion.div
        className="donorBox"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Register As A Blood Donor</h2>
        <p>Fill your details and become part of life saving network.</p>

        <form>
          <input placeholder="Full Name" />
          <input placeholder="Phone Number" />
          <select>
            <option>Select Blood Group</option>
            <option>A+</option>
            <option>B+</option>
            <option>O+</option>
            <option>O-</option>
          </select>
          <input placeholder="City" />

          <button type="button">Register Now</button>
        </form>
      </motion.div>
    </section>
  );
}

export default RegisterDonor;