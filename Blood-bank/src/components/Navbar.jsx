import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaTint } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo" onClick={closeMenu}>
          <FaTint />
          BloodLink
        </Link>

        <ul className="desktopMenu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blood-search">Find Blood</Link></li>
          <li><Link to="/hospitals">Hospitals</Link></li>
          <li><Link to="/register-donor">Donate</Link></li>
        </ul>

        <Link to="/register-donor" className="desktopBtn">
          <button>Become Donor</button>
        </Link>

        <button className="menuBtn" onClick={() => setOpen(true)}>
          <FaBars />
        </button>
      </nav>

      <div className={`overlay ${open ? "showOverlay" : ""}`} onClick={closeMenu}></div>

      <aside className={`mobileSidebar ${open ? "showSidebar" : ""}`}>
        <div className="sidebarTop">
          <div className="sidebarLogo">
            <FaTint />
            BloodLink
          </div>

          <button className="closeBtn" onClick={closeMenu}>
            <FaTimes />
          </button>
        </div>

        <div className="sidebarLinks">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/blood-search" onClick={closeMenu}>Find Blood</Link>
          <Link to="/hospitals" onClick={closeMenu}>Hospitals</Link>
          <Link to="/register-donor" onClick={closeMenu}>Donate</Link>
        </div>

        <Link to="/register-donor" onClick={closeMenu}>
          <button className="sidebarBtn">Become Donor</button>
        </Link>
      </aside>
    </>
  );
}

export default Navbar;