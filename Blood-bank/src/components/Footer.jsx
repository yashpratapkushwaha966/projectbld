import { Link } from "react-router-dom";
import { FaTint, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footerGrid">
        <div>
          <h3><FaTint /> Project BLD</h3>
          <p>A blood donor network project focused on fast local emergency help.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/blood-search">Find Donor</Link>
          <Link to="/register-donor">Become Donor</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <p><FaPhoneAlt /> Emergency support coming soon</p>
          <p><FaWhatsapp /> WhatsApp integration coming soon</p>
        </div>
      </div>
      <div className="footerBottom">© 2026 Project BLD. Built for learning and social impact.</div>
    </footer>
  );
}
export default Footer;
