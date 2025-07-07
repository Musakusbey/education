import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function Apply() {
  const [form, setForm] = useState({
    ad: "",
    soyad: "",
    email: "",
    telefon: "",
    alan: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
    <>
      <Navbar />
      <div
        className="apply-bg-animated"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 8px",
        }}
      >
        <form className="form-container" onSubmit={handleSubmit}>
          <h1>Başvuru Formu</h1>
          {!submitted ? (
            <>
              <input
                type="text"
                name="ad"
                placeholder="Ad"
                required
                value={form.ad}
                onChange={handleChange}
              />
              <input
                type="text"
                name="soyad"
                placeholder="Soyad"
                required
                value={form.soyad}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="E-posta"
                required
                value={form.email}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="telefon"
                placeholder="Telefon"
                required
                value={form.telefon}
                onChange={handleChange}
              />
              <select
                name="alan"
                required
                value={form.alan}
                onChange={handleChange}
              >
                <option value="">İlgi Alanı Seçin</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Full-Stack">Full-Stack</option>
                <option value="Mobil">Mobil</option>
              </select>
              <button type="submit" disabled={loading}>
                {loading ? "Gönderiliyor..." : "Hemen Başvur"}
              </button>
              {error && (
                <div style={{ color: "red", marginTop: 8 }}>{error}</div>
              )}
            </>
          ) : (
            <div
              className="info-text"
              style={{
                fontSize: "1.1rem",
                color: "#204080",
                margin: "32px 0",
                textAlign: "center",
              }}
            >
              Başvurunuz alındı. En kısa sürede sizinle iletişime geçeceğiz.
            </div>
          )}
        </form>
        <style>{`
          .apply-bg-animated {
            background: #fff;
            overflow-x: hidden;
            width: 100vw;
            box-sizing: border-box;
          }
          .form-container {
            max-width: 600px;
            width: 100%;
            margin: 0 auto;
            background: white;
            padding: 32px;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.08);
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
          }
          .form-container h1 {
            text-align: center;
            color: #1c2a4d;
            margin-bottom: 24px;
            font-family: 'Inter', sans-serif;
            font-size: 2rem;
            font-weight: 700;
          }
          .form-container input,
          .form-container select {
            width: 100%;
            height: 48px;
            padding: 0 12px;
            margin-bottom: 16px;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 1rem;
            font-family: 'Inter', sans-serif;
            background: #f9fafc;
            transition: border 0.2s;
            box-sizing: border-box;
          }
          .form-container input:focus,
          .form-container select:focus {
            border: 1.5px solid #FFA726;
            outline: none;
          }
          .form-container button {
            width: 100%;
            height: 48px;
            background: linear-gradient(to right, #FFA726, #FB8C00);
            border: none;
            color: white;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1.08rem;
            font-family: 'Inter', sans-serif;
            transition: 0.2s;
            margin-top: 8px;
            box-shadow: 0 2px 8px rgba(251,140,0,0.08);
            box-sizing: border-box;
          }
          .form-container button:hover {
            background: linear-gradient(to right, #FB8C00, #EF6C00);
          }
          .form-container .info-text {
            margin-top: 16px;
            text-align: center;
            font-size: 0.97rem;
            color: #333;
            opacity: 0.85;
          }
          @media (max-width: 700px) {
            .apply-bg-animated {
              padding: 8px 4px;
              min-height: 100vh;
              width: 100vw;
              overflow-x: hidden;
            }
            .form-container {
              padding: 16px 12px;
              border-radius: 12px;
              margin: 0 4px;
              width: calc(100% - 8px);
              max-width: none;
            }
            .form-container h1 {
              font-size: 1.4rem;
              margin-bottom: 16px;
            }
            .form-container input,
            .form-container select {
              height: 44px;
              padding: 0 10px;
              margin-bottom: 12px;
              font-size: 0.95rem;
            }
            .form-container button {
              height: 44px;
              font-size: 1rem;
              margin-top: 4px;
              width: 100%;
              display: block;
            }
            .form-container .info-text {
              font-size: 0.9rem;
              margin: 24px 0;
            }
            html, body, #root {
              overflow-x: hidden !important;
              width: 100vw;
              box-sizing: border-box;
            }
          }
        `}</style>
      </div>
    </>
  );
}
