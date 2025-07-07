import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar-oe2025">
      <nav className="navbar-inner-oe2025">
        <div className="navbar-logo-oe2025">
          <Link to="/">Frovexis</Link>
        </div>
        <ul className="navbar-links-oe2025">
          <li>
            <Link to="/programlar">Programlar</Link>
          </li>
          <li>
            <Link to="/hakkimizda">Hakkımızda</Link>
          </li>
        </ul>
        <Link to="/basvuru" className="navbar-cta-oe2025">
          Başvuru
        </Link>
      </nav>
      <style>{`
        .navbar-oe2025 {
          width: 100%;
          background: linear-gradient(120deg, #f8fbff 0%, #eaf3ff 100%);
          box-shadow: 0 2px 12px rgba(30, 60, 120, 0.04);
          padding: 0;
          margin: 0;
        }
        .navbar-inner-oe2025 {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          padding: 0 24px;
        }
        .navbar-logo-oe2025 a {
          font-size: 2rem;
          font-weight: 800;
          color: #1a2236;
          text-decoration: none;
          letter-spacing: 0.01em;
        }
        .navbar-links-oe2025 {
          display: flex;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .navbar-links-oe2025 li a {
          color: #1a2236;
          font-size: 1.08rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.18s;
        }
        .navbar-links-oe2025 li a:hover {
          color: #1976d2;
        }
        .navbar-cta-oe2025 {
          background: #1976d2;
          color: #fff;
          font-size: 1.08rem;
          font-weight: 700;
          padding: 10px 28px;
          border-radius: 8px;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(30, 60, 120, 0.07);
          transition: background 0.18s, color 0.18s;
        }
        .navbar-cta-oe2025:hover {
          background: #1251a3;
          color: #fff;
        }
        @media (max-width: 900px) {
          .navbar-inner-oe2025 {
            padding: 0 8px;
            height: 56px;
          }
          .navbar-logo-oe2025 a {
            font-size: 1.4rem;
          }
          .navbar-links-oe2025 {
            gap: 18px;
          }
          .navbar-cta-oe2025 {
            padding: 8px 18px;
            font-size: 1rem;
          }
        }
        @media (max-width: 700px) {
          .navbar-inner-oe2025 {
            flex-direction: column;
            height: auto;
            gap: 8px;
            padding: 8px 4vw;
          }
          .navbar-links-oe2025 {
            gap: 12px;
          }
        }
      `}</style>
    </header>
  );
}
