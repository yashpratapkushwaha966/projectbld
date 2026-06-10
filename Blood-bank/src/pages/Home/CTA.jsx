import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="cta">
      <h2>Register Today. Help Tomorrow.</h2>
      <p>Join Project BLD as a donor and become part of a local emergency support network.</p>
      <Link to="/register-donor"><button>Become A Donor</button></Link>
    </section>
  );
}
export default CTA;
