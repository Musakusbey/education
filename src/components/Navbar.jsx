import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          Frovexis
        </Link>

        <div
          className={`navbar-hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <Link to="/programlar" onClick={closeMenu}>
            Programlar
          </Link>
          <Link to="/hakkimizda" onClick={closeMenu}>
            Hakkımızda
          </Link>
          <Link to="/basvuru" className="cta" onClick={closeMenu}>
            Başvuru
          </Link>
        </div>
      </div>
    </nav>
  );
}
