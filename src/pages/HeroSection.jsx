import { useState } from "react";

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
      const res = await fetch("http://localhost:5000/api/contact", {
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
    <section className="frovexis-hero">
      <div className="frovexis-hero-inner">
        {/* Sol: Görsel */}
        <div className="frovexis-hero-visual">
          <div className="frovexis-hero-bg"></div>
          <div className="frovexis-hero-illu">
            {/* SVG veya emoji ile yazılım temalı illüstrasyon */}
            <svg
              width="140"
              height="140"
              viewBox="0 0 140 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="70"
                cy="70"
                r="70"
                fill="#FBB03B"
                fillOpacity="0.18"
              />
              <rect
                x="30"
                y="50"
                width="80"
                height="40"
                rx="10"
                fill="#204080"
              />
              <rect x="40" y="60" width="60" height="8" rx="4" fill="#fff" />
              <rect x="40" y="75" width="30" height="6" rx="3" fill="#4f8cff" />
              <rect x="75" y="75" width="25" height="6" rx="3" fill="#FBB03B" />
              <circle cx="50" cy="90" r="6" fill="#fff" />
              <circle cx="90" cy="90" r="6" fill="#fff" />
            </svg>
            <div className="frovexis-hero-illu-fade"></div>
          </div>
        </div>
        {/* Sağ: Form */}
        <div className="frovexis-hero-form">
          <h1 className="frovexis-hero-title anim-fade-slide">
            Frovexis'e Başvur – 2025 Yeni Dönem Eğitimleri Başladı!
          </h1>
          {!submitted ? (
            <form className="frovexis-form" onSubmit={handleSubmit}>
              <div className="frovexis-form-row">
                <input
                  name="ad"
                  type="text"
                  placeholder="Ad"
                  value={form.ad}
                  onChange={handleChange}
                  required
                />
                <input
                  name="soyad"
                  type="text"
                  placeholder="Soyad"
                  value={form.soyad}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                name="email"
                type="email"
                placeholder="E-posta"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                name="telefon"
                type="tel"
                placeholder="Telefon"
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
              <div className="frovexis-form-checks">
                <label>
                  <input
                    type="checkbox"
                    name="kvkk"
                    checked={form.kvkk}
                    onChange={handleChange}
                    required
                  />{" "}
                  KVKK Aydınlatma Metni'ni okudum.
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="onay"
                    checked={form.onay}
                    onChange={handleChange}
                    required
                  />{" "}
                  Başvuru koşullarını kabul ediyorum.
                </label>
              </div>
              <button
                className="frovexis-hero-cta"
                type="submit"
                disabled={loading}
              >
                {loading ? "Gönderiliyor..." : "Hemen Başvur"}
              </button>
              {error && (
                <div style={{ color: "red", marginTop: 8 }}>{error}</div>
              )}
            </form>
          ) : (
            <div
              className="frovexis-hero-success"
              style={{
                textAlign: "center",
                fontSize: "1.2rem",
                color: "#204080",
                marginTop: 32,
              }}
            >
              Başvurunuz alındı. En kısa sürede sizinle iletişime geçeceğiz.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
