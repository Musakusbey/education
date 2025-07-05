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
        <button
          className="navbar-hamburger"
          aria-label="Menüyü Aç/Kapat"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className={open ? "bar open" : "bar"}></span>
          <span className={open ? "bar open" : "bar"}></span>
          <span className={open ? "bar open" : "bar"}></span>
        </button>
        <div className={`navbar-menu${open ? " open" : ""}`}>
          <a href="/programlar" onClick={() => setOpen(false)}>
            Programlar
          </a>
          <a href="/hakkimizda" onClick={() => setOpen(false)}>
            Hakkımızda
          </a>
          <a href="/basvuru" className="cta" onClick={() => setOpen(false)}>
            Başvuru
          </a>
        </div>
      </div>
      {open && (
        <div className="navbar-backdrop" onClick={() => setOpen(false)}></div>
      )}
      <style>{`
        .navbar-hamburger {
          display: none;
          background: none;
          border: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          z-index: 40;
        }
        .navbar-hamburger .bar {
          width: 28px;
          height: 3px;
          background: #204080;
          border-radius: 2px;
          transition: 0.3s;
          display: block;
        }
        .navbar-hamburger .bar.open:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        .navbar-hamburger .bar.open:nth-child(2) {
          opacity: 0;
        }
        .navbar-hamburger .bar.open:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }
        @media (max-width: 900px) {
          .navbar-hamburger {
            display: flex;
            position: absolute;
            right: 24px;
            top: 18px;
          }
          .navbar-menu {
            position: absolute;
            top: 68px;
            right: 0;
            left: 0;
            background: #ffcd4f;
            flex-direction: column;
            align-items: flex-start;
            gap: 0;
            padding: 18px 0 12px 0;
            box-shadow: 0 8px 32px 0 #20408011;
            z-index: 35;
            display: none;
          }
          .navbar-menu.open {
            display: flex;
          }
          .navbar-menu a {
            width: 100%;
            padding: 14px 32px;
            font-size: 1.1rem;
            border-radius: 0;
            border-bottom: 1px solid #ffe580;
          }
          .navbar-menu a:last-child {
            border-bottom: none;
          }
        }
        .navbar-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(32, 64, 128, 0.12);
          z-index: 30;
        }
      `}</style>
    </nav>
  );
}
