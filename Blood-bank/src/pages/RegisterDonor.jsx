import { motion } from "framer-motion";
import { FaUser, FaPhone, FaCity, FaTint, FaCheckCircle } from "react-icons/fa";

function RegisterDonor() {
  return (
    <section className="donorPage">
      <motion.div
        className="donorWrapper"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="donorLeft">
          <span className="badgeWhite">Become a Hero</span>
          <h1>Donate Blood, Save Lives</h1>
          <p>
            Register as a verified donor and help people during emergency blood needs.
          </p>

          <div className="donorPoints">
            <p><FaCheckCircle /> Help patients in your city</p>
            <p><FaCheckCircle /> Get notified for nearby requests</p>
            <p><FaCheckCircle /> Build your donation history</p>
          </div>
        </div>

        <div className="donorFormCard">
          <h2>Donor Registration</h2>
          <p>Fill your basic details</p>

          <form>
            <div className="inputGroup">
              <FaUser />
              <input placeholder="Full Name" />
            </div>

            <div className="inputGroup">
              <FaPhone />
              <input placeholder="Phone Number" />
            </div>

            <div className="inputGroup">
              <FaTint />
              <select>
                <option>Select Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>

            <div className="inputGroup">
              <FaCity />
              <input placeholder="City" />
            </div>

            <button type="button">Register Now</button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

export default RegisterDonor;