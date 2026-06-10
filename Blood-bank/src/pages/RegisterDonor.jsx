import { motion } from "framer-motion";
import { FaUser, FaPhone, FaCity, FaTint, FaCheckCircle, FaWhatsapp, FaMapMarkerAlt, FaCamera, FaCalendarAlt } from "react-icons/fa";

function RegisterDonor() {
  return (
    <section className="donorPage">
      <motion.div className="donorWrapper" initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="donorLeft">
          <span className="badgeWhite">Become a Life Saver</span>
          <h1>Register as a Blood Donor</h1>
          <p>Your one registration can help someone during a serious emergency. We only collect necessary details and contact consent.</p>
          <div className="donorPoints">
            <p><FaCheckCircle /> Nearby emergency requests</p>
            <p><FaCheckCircle /> Consent based donor contact</p>
            <p><FaCheckCircle /> City and area based search</p>
          </div>
        </div>

        <div className="donorFormCard">
          <h2>Donor Registration</h2>
          <p>Fill your basic details. Backend will save this data later.</p>
          <form>
            <div className="formGrid">
              <div className="inputGroup"><FaUser /><input placeholder="Full Name" /></div>
              <div className="inputGroup"><FaPhone /><input placeholder="Mobile Number" /></div>
              <div className="inputGroup"><FaWhatsapp /><input placeholder="WhatsApp Number" /></div>
              <div className="inputGroup">
                <FaTint />
                <select>
                  <option>Select Blood Group</option>
                  <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                  <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                </select>
              </div>
              <div className="inputGroup"><FaCity /><input placeholder="City" /></div>
              <div className="inputGroup"><FaMapMarkerAlt /><input placeholder="Area / Locality" /></div>
              <div className="inputGroup"><FaUser /><input type="number" placeholder="Age" /></div>
              <div className="inputGroup">
                <FaUser />
                <select><option>Gender</option><option>Male</option><option>Female</option><option>Other</option></select>
              </div>
              <div className="inputGroup"><FaCalendarAlt /><input type="date" /></div>
              <div className="inputGroup">
                <FaCheckCircle />
                <select><option>Available for Emergency?</option><option>Yes</option><option>No</option><option>Emergency Only</option></select>
              </div>
              <div className="inputGroup fullWidth"><FaCamera /><input type="file" /></div>
              <label className="consent fullWidth">
                <input type="checkbox" />
                I agree to be contacted for blood donation requests.
              </label>
            </div>
            <button type="button">Register Donor</button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
export default RegisterDonor;
