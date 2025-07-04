import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a href="/" className="navbar-logo">
          Frovexis
        </a>
        <div className="navbar-menu">
          <a href="/programlar">Programlar</a>
          <a href="/hakkimizda">Hakkımızda</a>
          <a href="/basvuru" className="cta">
            Başvuru
          </a>
        </div>
        {/* Hamburger menu for mobile can be added here if needed */}
      </div>
    </nav>
  );
}
