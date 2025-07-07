import React, { useState } from "react";

export default function HeroSection() {
  const [form, setForm] = useState({
    ad: "",
    soyad: "",
    email: "",
    telefon: "",
    alan: "",
    kvkk: false,
    onay: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ad: form.ad,
          soyad: form.soyad,
          email: form.email,
          telefon: form.telefon,
          alan: form.alan,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    } catch {
      setError("Bağlantı hatası, lütfen tekrar deneyin.");
    }
    setLoading(false);
  };

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
        {/* Sağ: Modern Form */}
        <div className="hero-form-oe2025">
          <div className="hero-form-title-oe2025">FORMU DOLDUR</div>
          {!submitted ? (
            <form className="hero-form-inner-oe2025" onSubmit={handleSubmit}>
              <input
                name="ad"
                type="text"
                placeholder="Ad *"
                value={form.ad}
                onChange={handleChange}
                required
              />
              <input
                name="soyad"
                type="text"
                placeholder="Soyad *"
                value={form.soyad}
                onChange={handleChange}
                required
              />
              <input
                name="email"
                type="email"
                placeholder="E-Posta *"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                name="telefon"
                type="tel"
                placeholder="Telefon *"
                value={form.telefon}
                onChange={handleChange}
                required
              />
              <select
                name="alan"
                value={form.alan}
                onChange={handleChange}
                required
              >
                <option value="">İlgi Alanı Seçin</option>
                <option>Frontend</option>
                <option>Backend</option>
                <option>Fullstack</option>
                <option>Mobil</option>
                <option>UI/UX</option>
              </select>
              <div className="hero-form-checks-oe2025">
                <label>
                  <input
                    type="checkbox"
                    name="kvkk"
                    checked={form.kvkk}
                    onChange={handleChange}
                    required
                  />
                  <span>
                    {" "}
                    Kişisel verilerimin işlenmesine, saklanmasına ve
                    aktarılmasına ilişkin "Aydınlatma Metni"ni okudum, anladım.
                  </span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="onay"
                    checked={form.onay}
                    onChange={handleChange}
                    required
                  />
                  <span> Başvuru koşullarını kabul ediyorum.</span>
                </label>
              </div>
              <button
                className="hero-form-cta-oe2025"
                type="submit"
                disabled={loading}
              >
                {loading ? "Gönderiliyor..." : "Başvur"}
              </button>
              <div className="hero-form-note-oe2025">* Zorunlu alan</div>
              {error && <div className="hero-form-error-oe2025">{error}</div>}
            </form>
          ) : (
            <div className="hero-form-success-oe2025">
              Başvurunuz alındı. En kısa sürede sizinle iletişime geçeceğiz.
            </div>
          )}
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
          line-height: 1.13;
        }
        .hero-desc-oe2025 {
          font-size: 1.15rem;
          color: #2d3a4a;
          margin-bottom: 22px;
          font-weight: 500;
        }
        .hero-tik-list-oe2025 {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .hero-tik-list-oe2025 li {
          font-size: 1.05rem;
          color: #2d3a4a;
          margin-bottom: 12px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .tik-oe2025 {
          color: #e53935;
          font-size: 1.2em;
          font-weight: bold;
          margin-right: 2px;
        }
        .hero-form-oe2025 {
          flex: 0 0 370px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 16px rgba(30, 60, 120, 0.07);
          padding: 32px 28px 24px 28px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .hero-form-title-oe2025 {
          color: #1976d2;
          font-size: 1.25rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 22px;
          letter-spacing: 0.01em;
        }
        .hero-form-inner-oe2025 {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .hero-form-inner-oe2025 input,
        .hero-form-inner-oe2025 select {
          border: none;
          border-bottom: 2px solid #e3e8ee;
          border-radius: 0;
          font-size: 1rem;
          padding: 10px 4px 8px 0;
          background: transparent;
          margin-bottom: 2px;
          transition: border-color 0.2s;
        }
        .hero-form-inner-oe2025 input:focus,
        .hero-form-inner-oe2025 select:focus {
          outline: none;
          border-bottom: 2px solid #1976d2;
        }
        .hero-form-checks-oe2025 {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 2px;
        }
        .hero-form-checks-oe2025 label {
          font-size: 0.92rem;
          color: #4a5568;
          display: flex;
          align-items: flex-start;
          gap: 7px;
          font-weight: 400;
        }
        .hero-form-checks-oe2025 input[type="checkbox"] {
          accent-color: #1976d2;
          width: 16px;
          height: 16px;
          margin-top: 2px;
        }
        .hero-form-cta-oe2025 {
          background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%);
          color: #fff;
          border: none;
          padding: 14px 0;
          border-radius: 8px;
          font-size: 1.13rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 8px;
          margin-bottom: 2px;
          transition: background 0.2s, transform 0.2s;
        }
        .hero-form-cta-oe2025:hover {
          background: linear-gradient(90deg, #f7931e 0%, #ff6b35 100%);
          transform: translateY(-2px);
        }
        .hero-form-cta-oe2025:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        .hero-form-note-oe2025 {
          color: #8a99b3;
          font-size: 0.88rem;
          text-align: left;
          margin-top: 2px;
        }
        .hero-form-error-oe2025 {
          color: #e53935;
          font-size: 0.95rem;
          text-align: left;
          margin-top: 4px;
        }
        .hero-form-success-oe2025 {
          color: #1976d2;
          font-size: 1.1rem;
          text-align: center;
          font-weight: 500;
        }
        @media (max-width: 900px) {
          .hero-inner-oe2025 {
            gap: 24px;
            padding: 36px 8px 24px 8px;
          }
          .hero-form-oe2025 {
            flex: 0 0 320px;
            padding: 22px 12px 18px 12px;
          }
        }
        @media (max-width: 768px) {
          .hero-inner-oe2025 {
            flex-direction: column;
            gap: 32px;
            padding: 32px 4vw 18px 4vw;
          }
          .hero-left-oe2025 {
            max-width: 100%;
            min-width: 0;
            width: 100%;
          }
          .hero-title-oe2025 {
            font-size: 1.3rem;
            margin-bottom: 12px;
          }
          .hero-desc-oe2025 {
            font-size: 1rem;
            margin-bottom: 14px;
          }
          .hero-tik-list-oe2025 li {
            font-size: 0.98rem;
            margin-bottom: 8px;
          }
          .hero-form-oe2025 {
            flex: none;
            width: 100%;
            padding: 16px 4vw 12px 4vw;
          }
          .hero-form-title-oe2025 {
            font-size: 1.1rem;
            margin-bottom: 14px;
          }
        }
      `}</style>
    </section>
  );
}
