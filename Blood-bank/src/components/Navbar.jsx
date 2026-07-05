import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes, FaTint, FaUserCircle, FaTachometerAlt, FaCog, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const closeMenu = () => setOpen(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    closeMenu();
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "";

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
          {isLoggedIn ? (
            <li><button className="navLogout" onClick={handleLogout}>Logout</button></li>
          ) : (
            <li><NavLink to="/login">Login</NavLink></li>
          )}
        </ul>

        {isLoggedIn && (
          <div className="profileMenu" ref={menuRef}>
            <button
              className="avatarBtn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={menuOpen}
              aria-label="Open account menu"
            >
              {initials ? <span className="avatarInitials">{initials}</span> : <FaUserCircle />}
            </button>

            <div className={`profileDropdown ${menuOpen ? "showDropdown" : ""}`} role="menu">
              <div className="profileDropdownHeader">
                <span className="avatarInitials small">{initials || <FaUserCircle />}</span>
                <div>
                  <strong>{user?.name || "Account"}</strong>
                  <small>{user?.email}</small>
                </div>
              </div>
              <button className="dropdownItem" role="menuitem" disabled title="Coming soon"><FaUserCircle /> My Profile</button>
              <Link to="/blood-search" role="menuitem" onClick={() => setMenuOpen(false)}><FaTachometerAlt /> Dashboard</Link>
              <button className="dropdownItem" role="menuitem" disabled title="Coming soon"><FaCog /> Settings</button>
              <button className="dropdownLogout" role="menuitem" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
            </div>
          </div>
        )}
        <Link to="/blood-search" className="desktopBtn"><button>Emergency Help</button></Link>
        <button className="menuBtn" onClick={() => setOpen(true)} aria-label="Open menu"><FaBars /></button>
      </nav>

      <div className={`overlay ${open ? "showOverlay" : ""}`} onClick={closeMenu}></div>

      <aside className={`mobileSidebar ${open ? "showSidebar" : ""}`}>
        <div className="sidebarTop">
          <div className="sidebarLogo"><FaTint /> Project BLD</div>
          <button className="closeBtn" onClick={closeMenu} aria-label="Close menu"><FaTimes /></button>
        </div>

        <div className="sidebarLinks">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/blood-search" onClick={closeMenu}>Find Donor</Link>
          <Link to="/hospitals" onClick={closeMenu}>Hospitals</Link>
          <Link to="/register-donor" onClick={closeMenu}>Become Donor</Link>
          {isLoggedIn ? (
            <button className="sidebarBtn logoutSide" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login" onClick={closeMenu}>Login</Link>
          )}
        </div>

        <Link to="/blood-search" onClick={closeMenu}>
          <button className="sidebarBtn">Emergency Help</button>
        </Link>
      </aside>
    </>
  );
}
export default Navbar;
