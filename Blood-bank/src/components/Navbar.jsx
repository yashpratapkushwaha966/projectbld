import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaTint } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logoIcon"><FaTint /></span>
          <span>Project <b>BLD</b><small>Blood Donor Network</small></span>
        </Link>

        <ul className="desktopMenu">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/blood-search">Find Donor</NavLink></li>
          <li><NavLink to="/hospitals">Hospitals</NavLink></li>
          <li><NavLink to="/register-donor">Become Donor</NavLink></li>
        </ul>

        <Link to="/blood-search" className="desktopBtn"><button>Emergency Help</button></Link>
        <button className="menuBtn" onClick={() => setOpen(true)}><FaBars /></button>
      </nav>

      <div className={`overlay ${open ? "showOverlay" : ""}`} onClick={closeMenu}></div>

      <aside className={`mobileSidebar ${open ? "showSidebar" : ""}`}>
        <div className="sidebarTop">
          <div className="sidebarLogo"><FaTint /> Project BLD</div>
          <button className="closeBtn" onClick={closeMenu}><FaTimes /></button>
        </div>

        <div className="sidebarLinks">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/blood-search" onClick={closeMenu}>Find Donor</Link>
          <Link to="/hospitals" onClick={closeMenu}>Hospitals</Link>
          <Link to="/register-donor" onClick={closeMenu}>Become Donor</Link>
        </div>

        <Link to="/blood-search" onClick={closeMenu}>
          <button className="sidebarBtn">Emergency Help</button>
        </Link>
      </aside>
    </>
  );
}
export default Navbar;
