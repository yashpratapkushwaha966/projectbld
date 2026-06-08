import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        BloodLink
      </div>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/blood-search">Find Blood</Link>
        </li>

        <li>
          <Link to="/hospitals">Hospitals</Link>
        </li>

        <li>
          <Link to="/register-donor">Donate</Link>
        </li>
      </ul>

      <button>Become Donor</button>
    </nav>
  );
}

export default Navbar;