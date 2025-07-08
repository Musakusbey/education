import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero-section-oe2025">
      <div className="hero-inner-oe2025">
        {/* Sol: Vurgu, Başlık, Açıklama, Tikler */}
        <div className="hero-left-oe2025">
          <div className="hero-badge-oe2025">%100 online yazılım eğitimi</div>
          <h1 className="hero-title-oe2025">
            2025'te hızlı ve uygulamalı şekilde yazılım öğren!
          </h1>
          <p className="hero-desc-oe2025">
            Front-End'den Full-Stack'e, gerçek projelerle adım adım uzmanlaş!
            <br />
            <span style={{ fontWeight: 600, color: "#007bff" }}>
              Hayalindeki yazılım kariyerine <u>şimdi</u> başla.
            </span>
          </p>
          <ul className="hero-tik-list-oe2025">
            <li>
              <span className="tik-oe2025">✔</span> 7/24 mentor desteği
            </li>
            <li>
              <span className="tik-oe2025">✔</span> Canlı dersler ve proje
              odaklı eğitim
            </li>
            <li>
              <span className="tik-oe2025">✔</span> Referans mektubu ve staj
              imkânı
            </li>
          </ul>
        </div>
        {/* Sağ: Modern CTA ve Tanıtım Kutusu */}
        <div
          className="hero-form-oe2025"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 320,
            maxWidth: 400,
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            padding: "32px 24px",
          }}
        >
          <div
            className="hero-form-title-oe2025"
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
              marginBottom: 12,
              color: "#1a2236",
            }}
          >
            Sana En Uygun Programı Bul!
          </div>
          <div
            style={{
              fontSize: "1.08rem",
              color: "#444",
              marginBottom: 18,
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            1 dakikada 3 soruluk mini quiz ile <b>yazılım yolculuğuna</b> en
            uygun programı keşfet.
            <br />
            <span style={{ color: "#007bff", fontWeight: 600 }}>
              Kariyerine güvenle başla!
            </span>
          </div>
          <button
            className="hero-cta-quiz-btn"
            onClick={() => navigate("/basvuru")}
            style={{
              background: "linear-gradient(90deg,#FFA726,#FB8C00)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.13rem",
              border: "none",
              borderRadius: 8,
              padding: "16px 32px",
              marginTop: 8,
              boxShadow: "0 2px 8px rgba(251,140,0,0.08)",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            Programını Bul &rarr;
          </button>
          <div
            style={{
              fontSize: "0.97rem",
              color: "#888",
              marginTop: 18,
              textAlign: "center",
            }}
          >
            Quiz sonunda sana özel program önerisi ve başvuru fırsatı!
          </div>
        </div>
      </div>
      <style>{`
        .hero-section-oe2025 {
          width: 100%;
          background: linear-gradient(120deg, #f8fbff 0%, #eaf3ff 100%);
          padding: 0;
          margin: 0;
        }
        .hero-inner-oe2025 {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 48px;
          padding: 56px 24px 40px 24px;
        }
        .hero-left-oe2025 {
          flex: 1 1 0;
          min-width: 280px;
          max-width: 540px;
        }
        .hero-badge-oe2025 {
          color: #e53935;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 18px;
          letter-spacing: 0.01em;
        }
        .hero-title-oe2025 {
          font-size: 2.3rem;
          font-weight: 800;
          color: #1a2236;
          margin-bottom: 18px;
        }
        .hero-desc-oe2025 {
          font-size: 1.18rem;
          color: #2c3e50;
          margin-bottom: 18px;
        }
        .hero-tik-list-oe2025 {
          list-style: none;
          padding: 0;
          margin: 0 0 18px 0;
        }
        .tik-oe2025 {
          color: #43a047;
          font-weight: bold;
          margin-right: 8px;
        }
        @media (max-width: 900px) {
          .hero-inner-oe2025 {
            flex-direction: column;
            gap: 24px;
            padding: 32px 4px 24px 4px;
          }
          .hero-form-oe2025 {
            min-width: unset !important;
            max-width: 98vw !important;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
