import OdevTeslim from "./OdevTeslim";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import QuizAlani from "../components/QuizAlani";
import ProgressKarti from "../components/ProgressKarti.jsx";
import React, { useState, useEffect } from "react";

// Kampüs paneline özel stiller
const panelCss = `
.kampus-panel-root { background: #f3f4f6; font-family: 'Inter', 'DM Sans', Arial, sans-serif; }
.kampus-panel-root .max-w-5xl { max-width: 80vw; margin-left: auto; margin-right: auto; }
.kampus-panel-root h1, .panel-title { font-size: 2.2rem; font-weight: 800; color: #1e293b; margin-bottom: 0.5rem; letter-spacing: -1px; }
.kampus-panel-root .panel-desc, .kampus-panel-root p.panel-desc { color: #64748b; font-size: 1.1rem; margin-bottom: 2rem; }
.kampus-panel-root .grid { display: grid; gap: 2rem; }
@media (min-width: 768px) { .kampus-panel-root .grid-cols-1 { grid-template-columns: 1fr; } .kampus-panel-root .md\:grid-cols-2 { grid-template-columns: 1fr 1fr; } .kampus-panel-root .lg\:grid-cols-3 { grid-template-columns: 1fr 1fr 1fr; } }
.kampus-panel-root .bg-white { background: #fff; }
.kampus-panel-root .shadow-sm { box-shadow: 0 2px 12px 0 rgba(16, 30, 54, 0.07); }
.kampus-panel-root .rounded-xl { border-radius: 1.2rem; }
.kampus-panel-root .flex { display: flex; }
.kampus-panel-root .items-center { align-items: center; }
.kampus-panel-root .justify-center { justify-content: center; }
.kampus-panel-root .text-gray-800 { color: #1e293b; }
.kampus-panel-root .text-gray-600 { color: #64748b; }
.kampus-panel-root .text-gray-700 { color: #334155; }
.kampus-panel-root .font-bold { font-weight: 700; }
.kampus-panel-root .font-semibold { font-weight: 600; }
.kampus-panel-root .mb-2 { margin-bottom: 0.5rem; }
.kampus-panel-root .mb-4 { margin-bottom: 1rem; }
.kampus-panel-root .mb-6 { margin-bottom: 1.5rem; }
.kampus-panel-root .mb-8 { margin-bottom: 2rem; }
.kampus-panel-root .space-y-10 > * + * { margin-top: 2.5rem; }
.kampus-panel-root .p-6 { padding: 1.5rem; }
.kampus-panel-root .py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
.kampus-panel-root .px-4 { padding-left: 1rem; padding-right: 1rem; }
@media (max-width: 768px) { .kampus-panel-root .max-w-5xl { max-width: 98vw !important; } .kampus-panel-root .p-6 { padding: 1rem; } .kampus-panel-root .py-10 { padding-top: 1.5rem; padding-bottom: 1.5rem; } }
.kampus-panel-root .input-style { padding: 0.5rem 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem; width: 100%; font-size: 1rem; margin-bottom: 0.5rem; transition: box-shadow 0.2s; }
.kampus-panel-root .input-style:focus { outline: none; box-shadow: 0 0 0 2px #3b82f6; border-color: #3b82f6; }
.kampus-panel-root .file-input { background: #f9fafb; border: 1px solid #d1d5db; padding: 0.5rem 1rem; border-radius: 0.5rem; width: 100%; margin-bottom: 0.5rem; }
.kampus-panel-root .btn-submit { background: #2563eb; color: #fff; font-weight: 500; padding: 0.5rem 1.5rem; border-radius: 0.5rem; border: none; transition: background 0.2s, transform 0.2s; cursor: pointer; }
.kampus-panel-root .btn-submit:hover { background: #1d4ed8; transform: scale(1.03); }
.kampus-panel-root .btn-primary { background: #9333ea; color: #fff; padding: 0.5rem 1.2rem; border-radius: 0.5rem; font-weight: 500; border: none; transition: background 0.2s, transform 0.2s; cursor: pointer; }
.kampus-panel-root .btn-primary:hover { background: #7c3aed; transform: scale(1.03); }
.kampus-panel-root .btn-secondary { background: #e0e7ff; color: #3730a3; padding: 0.5rem 1.2rem; border-radius: 0.5rem; font-weight: 500; border: none; transition: background 0.2s, transform 0.2s; cursor: pointer; }
.kampus-panel-root .btn-secondary:hover { background: #c7d2fe; transform: scale(1.03); }

/* Header ve başlık özel stilleri */
.header-container { display: flex; justify-content: space-between; align-items: center; padding: 16px 32px; background-color: #fff; border-bottom: 1px solid #e5e7eb; }
.header-container p { margin: 0; font-size: 16px; font-weight: 500; color: #374151; }
.logout-btn { padding: 6px 12px; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; transition: background 0.3s; }
.logout-btn:hover { background-color: #dc2626; }
.page-title { font-size: 28px; font-weight: 700; color: #111827; display: flex; align-items: center; gap: 8px; margin-top: 32px; margin-left: 32px; }
.page-subtitle { font-size: 16px; color: #6b7280; margin-left: 32px; margin-bottom: 32px; }

/* Modern Ödev Teslim Kartı ve Formu */
.card { background: #fff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); padding: 24px; margin: 24px 32px; max-width: 100%; transition: transform 0.2s; }
.card:hover { transform: scale(1.01); }
.card h2 { font-size: 20px; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
.form-group { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 12px; }
.form-group input, .form-group textarea { padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; flex: 1; min-width: 160px; }
.form-group textarea { resize: vertical; min-height: 60px; }
.upload-btn { background-color: #6366f1; color: white; border: none; border-radius: 8px; padding: 10px 16px; font-weight: 600; cursor: pointer; transition: background 0.3s; }
.upload-btn:hover { background-color: #4f46e5; }
@media (max-width: 768px) { .card { margin: 16px 0; padding: 16px; } }
.quiz-card { display: flex; flex-direction: column; align-items: start; gap: 1rem; }
.quiz-status { font-size: 1rem; color: #555; }
.disabled-btn { background-color: #ddd; color: #777; padding: 8px 16px; border-radius: 8px; border: none; font-weight: 500; cursor: not-allowed; }
.card-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; }
.card-subtext { font-size: 1rem; margin-bottom: 1rem; color: #444; }
.card-buttons { display: flex; gap: 1rem; flex-wrap: wrap; }
.btn-primary { background-color: #7b3fe4; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.6rem; cursor: pointer; font-weight: 500; transition: background 0.3s ease; }
.btn-primary:hover { background-color: #652ccc; }
.btn-secondary { background-color: #f3f4f6; color: #333; padding: 0.6rem 1.2rem; border: none; border-radius: 0.6rem; cursor: pointer; font-weight: 500; transition: background 0.3s ease; }
.btn-secondary:hover { background-color: #e5e7eb; }
.announcement-list { margin-top: 0.5rem; padding-left: 1.25rem; color: #444; line-height: 1.6; }
.announcement-list li { margin-bottom: 0.4rem; list-style-type: disc; }
`;

if (
  typeof document !== "undefined" &&
  !document.getElementById("kampus-panel-style")
) {
  const style = document.createElement("style");
  style.id = "kampus-panel-style";
  style.innerHTML = panelCss;
  document.head.appendChild(style);
}

function OdevTeslimKarti() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("email", email);
    formData.append("title", subject);
    formData.append("message", message);
    formData.append("file", selectedFile);
    try {
      const apiUrl =
        window.location.hostname === "localhost"
          ? "http://localhost:5000/api/odev-gonder"
          : "/api/odev-gonder";
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setSuccess(true);
        setFullName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setSelectedFile(null);
      } else {
        alert("Bir hata oluştu ❌");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucuya ulaşılamadı.");
    }
  };

  return (
    <div className="odev-form-card">
      <div className="odev-form-title">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path d="M4 4h16v16H4z" fill="#6366f1" />
        </svg>
        Ödev Teslim Formu
      </div>
      {success && (
        <div className="form-success-box">
          <div className="form-success-header">
            <span className="form-success-icon">✅</span>
            <span className="form-success-title">Gönderim Başarılı</span>
          </div>
          <div className="form-success-content">
            Ödeviniz başarıyla gönderildi.
          </div>
        </div>
      )}
      {!success && (
        <form onSubmit={handleSubmit}>
          <div className="odev-form-group">
            <input
              type="text"
              placeholder="Ad Soyad"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
            <input
              type="email"
              placeholder="E-posta adresi"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Ödev Başlığı"
              required
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
          </div>
          <div className="odev-form-group">
            <textarea
              placeholder="Açıklama"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
          {/* Uyarı mesajı */}
          <div className="form-warning-box">
            📌 Lütfen yalnızca bir gönderim yapınız. Gönderim sonrası değişiklik
            yapılamaz.
          </div>
          <div className="odev-form-group">
            <input
              type="file"
              id="file-upload-odev"
              className="custom-file-input"
              onChange={e => setSelectedFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <label htmlFor="file-upload-odev" className="file-upload-label">
              <span className="file-upload-icon">📎</span> Dosya Seç
            </label>
            <span className="file-upload-filename">
              {selectedFile ? selectedFile.name : "Dosya seçilmedi"}
            </span>
            <button className="odev-form-btn" type="submit">
              Gönder
            </button>
          </div>
        </form>
      )}
      <style>{`
        .odev-form-card {
          background: #fff;
          border-radius: 1.5rem;
          box-shadow: 0 6px 32px rgba(99,102,241,0.09);
          padding: 2.2rem 2.5rem 1.5rem 2.5rem;
          margin-bottom: 2.5rem;
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }
        .odev-form-title {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: #312e81;
          margin-bottom: 1.5rem;
        }
        .odev-form-title svg {
          color: #6366f1;
          font-size: 2rem;
        }
        .odev-form-group {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.2rem;
          flex-wrap: wrap;
        }
        .odev-form-group input,
        .odev-form-group textarea {
          flex: 1;
          min-width: 220px;
          padding: 12px 16px;
          border: 1.5px solid #e5e7eb;
          border-radius: 0.7rem;
          font-size: 1rem;
          background: #f9fafb;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .odev-form-group input:focus,
        .odev-form-group textarea:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 2px #a5b4fc55;
          outline: none;
        }
        .odev-form-btn {
          background: linear-gradient(90deg, #7c3aed 60%, #6366f1 100%);
          color: #fff;
          font-weight: 700;
          padding: 12px 32px;
          border-radius: 0.7rem;
          border: none;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          margin-left: auto;
          display: block;
        }
        .odev-form-btn:hover {
          background: linear-gradient(90deg, #5b21b6 60%, #6366f1 100%);
          transform: scale(1.04);
        }
        @media (max-width: 700px) {
          .odev-form-card {
            padding: 1.2rem 0.7rem;
          }
          .odev-form-group {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
      <style>{`
        .form-success-box {
          background: #e6f9ed;
          border: 2px solid #22c55e;
          border-radius: 1rem;
          box-shadow: 0 4px 24px rgba(34,197,94,0.10);
          padding: 1.5rem 2rem;
          margin-bottom: 1.5rem;
          margin-top: 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.7rem;
        }
        .form-success-header {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: #15803d;
        }
        .form-success-icon {
          font-size: 1.5rem;
        }
        .form-success-title {
          font-size: 1.18rem;
          font-weight: 700;
        }
        .form-success-content {
          color: #166534;
          font-size: 1.08rem;
          margin-left: 2.2rem;
        }
        .form-success-note {
          color: #166534;
          font-size: 0.98rem;
          margin-left: 2.2rem;
          margin-top: 0.2rem;
          font-style: italic;
        }
      `}</style>
      <style>{`
        .form-warning-box {
          background: #f3f4f6;
          color: #374151;
          font-size: 0.92rem;
          font-style: italic;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          margin-bottom: 0.7rem;
          margin-top: 0.2rem;
          display: inline-block;
        }
      `}</style>
      <style>{`
        .file-upload-label {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(90deg, #6366f1 60%, #7c3aed 100%);
          color: #fff;
          font-weight: 600;
          padding: 10px 22px;
          border-radius: 0.7rem;
          cursor: pointer;
          font-size: 1.08rem;
          transition: background 0.2s, transform 0.2s;
          margin-right: 1rem;
          margin-bottom: 0.5rem;
          border: none;
          box-shadow: 0 2px 8px rgba(99,102,241,0.08);
        }
        .file-upload-label:hover {
          background: linear-gradient(90deg, #4f46e5 60%, #7c3aed 100%);
          transform: scale(1.04);
        }
        .file-upload-icon {
          font-size: 1.3rem;
          margin-right: 0.2rem;
        }
        .file-upload-filename {
          color: #374151;
          font-size: 0.98rem;
          font-style: italic;
          margin-left: 0.2rem;
        }
      `}</style>
    </div>
  );
}

function ProjeTeslimKarti() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("email", email);
    formData.append("title", subject);
    formData.append("message", message);
    formData.append("file", selectedFile);
    try {
      const apiUrl =
        window.location.hostname === "localhost"
          ? "http://localhost:5000/api/proje-gonder"
          : "/api/proje-gonder";
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setSuccess(true);
        setFullName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setSelectedFile(null);
      } else {
        alert("Bir hata oluştu ❌");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucuya ulaşılamadı.");
    }
  };

  return (
    <div className="odev-form-card">
      <div className="odev-form-title">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 2C13.1 2 14 2.9 14 4V6.18C17.16 6.6 19.5 9.27 19.5 12.5C19.5 15.54 17.04 18 14 18C10.96 18 8.5 15.54 8.5 12.5C8.5 9.27 10.84 6.6 14 6.18V4C14 2.9 13.1 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"
            fill="#f43f5e"
          />
        </svg>
        Proje Teslimi
      </div>
      {success && (
        <div className="form-success-box">
          <div className="form-success-header">
            <span className="form-success-icon">✅</span>
            <span className="form-success-title">Gönderim Başarılı</span>
          </div>
          <div className="form-success-content">
            Projeniz başarıyla gönderildi.
          </div>
        </div>
      )}
      {!success && (
        <form onSubmit={handleSubmit}>
          <div className="odev-form-group">
            <input
              type="text"
              placeholder="Ad Soyad"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
            <input
              type="email"
              placeholder="E-posta"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Proje Başlığı"
              required
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
          </div>
          <div className="odev-form-group">
            <textarea
              placeholder="Açıklama"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
          {/* Uyarı mesajı */}
          <div className="form-warning-box">
            📌 Lütfen yalnızca bir gönderim yapınız. Gönderim sonrası değişiklik
            yapılamaz.
          </div>
          <div className="odev-form-group">
            <input
              type="file"
              id="file-upload-proje"
              className="custom-file-input"
              onChange={e => setSelectedFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <label htmlFor="file-upload-proje" className="file-upload-label">
              <span className="file-upload-icon">📎</span> Dosya Seç
            </label>
            <span className="file-upload-filename">
              {selectedFile ? selectedFile.name : "Dosya seçilmedi"}
            </span>
            <button className="odev-form-btn" type="submit">
              Gönder
            </button>
          </div>
        </form>
      )}
      <style>{`
        .odev-form-card {
          background: #fff;
          border-radius: 1.5rem;
          box-shadow: 0 6px 32px rgba(99,102,241,0.09);
          padding: 2.2rem 2.5rem 1.5rem 2.5rem;
          margin-bottom: 2.5rem;
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }
        .odev-form-title {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: #312e81;
          margin-bottom: 1.5rem;
        }
        .odev-form-title svg {
          color: #6366f1;
          font-size: 2rem;
        }
        .odev-form-group {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.2rem;
          flex-wrap: wrap;
        }
        .odev-form-group input,
        .odev-form-group textarea {
          flex: 1;
          min-width: 220px;
          padding: 12px 16px;
          border: 1.5px solid #e5e7eb;
          border-radius: 0.7rem;
          font-size: 1rem;
          background: #f9fafb;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .odev-form-group input:focus,
        .odev-form-group textarea:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 2px #a5b4fc55;
          outline: none;
        }
        .odev-form-btn {
          background: linear-gradient(90deg, #7c3aed 60%, #6366f1 100%);
          color: #fff;
          font-weight: 700;
          padding: 12px 32px;
          border-radius: 0.7rem;
          border: none;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          margin-left: auto;
          display: block;
        }
        .odev-form-btn:hover {
          background: linear-gradient(90deg, #5b21b6 60%, #6366f1 100%);
          transform: scale(1.04);
        }
        @media (max-width: 700px) {
          .odev-form-card {
            padding: 1.2rem 0.7rem;
          }
          .odev-form-group {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
      <style>{`
        .form-success-box {
          background: #e6f9ed;
          border: 2px solid #22c55e;
          border-radius: 1rem;
          box-shadow: 0 4px 24px rgba(34,197,94,0.10);
          padding: 1.5rem 2rem;
          margin-bottom: 1.5rem;
          margin-top: 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.7rem;
        }
        .form-success-header {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: #15803d;
        }
        .form-success-icon {
          font-size: 1.5rem;
        }
        .form-success-title {
          font-size: 1.18rem;
          font-weight: 700;
        }
        .form-success-content {
          color: #166534;
          font-size: 1.08rem;
          margin-left: 2.2rem;
        }
        .form-success-note {
          color: #166534;
          font-size: 0.98rem;
          margin-left: 2.2rem;
          margin-top: 0.2rem;
          font-style: italic;
        }
      `}</style>
      <style>{`
        .form-warning-box {
          background: #f3f4f6;
          color: #374151;
          font-size: 0.92rem;
          font-style: italic;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          margin-bottom: 0.7rem;
          margin-top: 0.2rem;
          display: inline-block;
        }
      `}</style>
      <style>{`
        .file-upload-label {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(90deg, #6366f1 60%, #7c3aed 100%);
          color: #fff;
          font-weight: 600;
          padding: 10px 22px;
          border-radius: 0.7rem;
          cursor: pointer;
          font-size: 1.08rem;
          transition: background 0.2s, transform 0.2s;
          margin-right: 1rem;
          margin-bottom: 0.5rem;
          border: none;
          box-shadow: 0 2px 8px rgba(99,102,241,0.08);
        }
        .file-upload-label:hover {
          background: linear-gradient(90deg, #4f46e5 60%, #7c3aed 100%);
          transform: scale(1.04);
        }
        .file-upload-icon {
          font-size: 1.3rem;
          margin-right: 0.2rem;
        }
        .file-upload-filename {
          color: #374151;
          font-size: 0.98rem;
          font-style: italic;
          margin-left: 0.2rem;
        }
      `}</style>
    </div>
  );
}

function QuizKarti() {
  return (
    <div className="card quiz-card">
      <h2>🧪 Sınav / Quiz Alanı</h2>
      <p className="quiz-status">Yakında aktif edilecek</p>
      <button className="disabled-btn" disabled>
        Aktif Değil
      </button>
    </div>
  );
}

function DersTakipKarti() {
  const lesson_title = "Hafta 2 - Frontend Giriş";
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);

  const handleSelect = async value => {
    if (locked) return;
    setSelected(value);
    const user = await supabase.auth.getUser();
    const user_id = user.data.user?.id;
    if (user_id) {
      let attended = false;
      let watched_recording = false;
      if (value === "attended") attended = true;
      if (value === "watched") watched_recording = true;
      const { data, error } = await supabase.from("lesson_attendance").insert([
        {
          user_id,
          lesson_title,
          attended,
          watched_recording,
          date: new Date().toISOString().slice(0, 10),
        },
      ]);
      console.log("Supabase insert result:", data, "error:", error);
      if (error) {
        alert("Kayıt sırasında hata oluştu: " + error.message);
      } else {
        setLocked(true);
      }
    }
  };

  const cardBase = {
    borderRadius: 18,
    padding: 28,
    minHeight: 120,
    cursor: locked ? "not-allowed" : "pointer",
    boxShadow: "0 4px 18px rgba(30,60,120,0.07)",
    transition: "all 0.18s",
    border: "2.5px solid #e5e7eb",
    background: "#fff",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  };

  const cardList = [
    {
      value: "attended",
      icon: "🟪",
      title: "Katıldım",
      desc: "Canlı derse aktif olarak katılım sağladım.",
      color: "#7c3aed",
      selectedBg: "#ede9fe",
      selectedBorder: "#7c3aed",
    },
    {
      value: "watched",
      icon: "🟦",
      title: "Ders Kaydını İzledim",
      desc: "Canlıya katılamadım ama kaydını sonradan izledim.",
      color: "#2563eb",
      selectedBg: "#dbeafe",
      selectedBorder: "#2563eb",
    },
    {
      value: "none",
      icon: "🟥",
      title: "Katılım Göstermedim",
      desc: "Bu haftaki derse hiçbir şekilde katılım sağlayamadım.",
      color: "#ef4444",
      selectedBg: "#fee2e2",
      selectedBorder: "#ef4444",
    },
  ];

  return (
    <div className="card">
      <h3 className="card-title">
        <span role="img" aria-label="takvim">
          📅
        </span>{" "}
        Ders Takibi & Katılım
      </h3>
      <p className="card-subtext">
        Bu haftaki dersin tarihleri: <strong>10–12 Temmuz, 19:00–21:00</strong>
      </p>
      {locked && (
        <p
          style={{
            color: "#22c55e",
            fontWeight: 600,
            marginTop: 18,
            fontSize: 16,
          }}
        >
          ✅ Katılım tercihiniz başarıyla kaydedildi ve artık değiştirilemez.
        </p>
      )}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        style={{
          marginTop: 22,
          opacity: locked ? 0.6 : 1,
          pointerEvents: locked ? "none" : "auto",
        }}
      >
        {cardList.map(card => {
          const isSelected = selected === card.value;
          return (
            <div
              key={card.value}
              onClick={() => handleSelect(card.value)}
              style={{
                ...cardBase,
                border: isSelected
                  ? `2.5px solid ${card.selectedBorder}`
                  : cardBase.border,
                background: isSelected ? card.selectedBg : cardBase.background,
                color: isSelected ? card.selectedBorder : "#222",
                transform:
                  !locked && isSelected
                    ? "scale(1.04)"
                    : !locked
                    ? "scale(1.01)"
                    : "none",
                boxShadow: isSelected
                  ? `0 6px 24px ${card.selectedBorder}22`
                  : cardBase.boxShadow,
                cursor: locked ? "not-allowed" : "pointer",
              }}
              className="attendance-card group"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                <span style={{ color: card.color, fontSize: 28 }}>
                  {card.icon}
                </span>
                <span>{card.title}</span>
                {isSelected && (
                  <span
                    style={{ color: "#22c55e", fontSize: 18, marginLeft: 8 }}
                  >
                    ✅ Seçildi
                  </span>
                )}
              </div>
              <div style={{ fontSize: 15, color: "#64748b", marginTop: 8 }}>
                {card.desc}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 18,
          fontSize: 13,
          color: "#64748b",
          textAlign: "center",
        }}
      >
        📌 Lütfen yalnızca bir seçenek belirleyin. Seçim sonrasında değişiklik
        yapamazsınız.
      </div>
    </div>
  );
}

function MentorGorusmeKarti() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="card">
      {!showForm ? (
        <>
          <h3 className="card-title">
            <span role="img" aria-label="mentor">
              💬
            </span>{" "}
            Mentor Görüşmeleri
          </h3>
          <p className="card-subtext">
            Mentor ile birebir görüşme planlamak için aşağıdan seçim
            yapabilirsin.
          </p>
          <button className="planla-btn mt-2" onClick={() => setShowForm(true)}>
            <span role="img" aria-label="takvim">
              📅
            </span>{" "}
            Planla
          </button>
        </>
      ) : (
        <MentorGorusmeFormu onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}

function MentorGorusmeFormu({ onClose }) {
  const [mentorName, setMentorName] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const user = await supabase.auth.getUser();
    const user_id = user.data.user?.id;
    if (!user_id) {
      setError("Kullanıcı oturumu bulunamadı.");
      return;
    }
    const { error } = await supabase.from("mentor_meetings").insert([
      {
        user_id,
        mentor_name: mentorName,
        meeting_date: meetingDate,
        meeting_time: meetingTime,
        notes,
        status: "pending",
      },
    ]);
    if (error) {
      setError("Kayıt sırasında hata oluştu: " + error.message);
    } else {
      setSuccess(true);
      setMentorName("");
      setMeetingDate("");
      setMeetingTime("");
      setNotes("");
      setTimeout(() => {
        setSuccess(false);
        if (onClose) onClose();
      }, 1500);
    }
  };

  return (
    <div className="mentor-planner-container mt-6">
      <h2>
        <span role="img" aria-label="takvim">
          📅
        </span>{" "}
        Mentor Görüşmesi Planla
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Örn: Ahmet Yılmaz"
          value={mentorName}
          onChange={e => setMentorName(e.target.value)}
          required
        />
        <input
          type="date"
          value={meetingDate}
          onChange={e => setMeetingDate(e.target.value)}
          required
        />
        <input
          type="time"
          value={meetingTime}
          onChange={e => setMeetingTime(e.target.value)}
          required
        />
        <textarea
          placeholder="Görüşme notunuzu buraya yazabilirsiniz..."
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={3}
        ></textarea>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="submit" className="save-btn">
            Kaydet
          </button>
          <button type="button" className="cancel-btn" onClick={onClose}>
            İptal
          </button>
        </div>
        {success && (
          <div
            style={{
              marginTop: "1rem",
              color: "#22c55e",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Görüşme başarıyla planlandı!
          </div>
        )}
        {error && (
          <div
            style={{
              marginTop: "1rem",
              color: "#ef4444",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
      </form>
    </div>
  );
}

// --- DuyuruBanner: Baştan Modern ve Sorunsuz ---
function DuyuruBanner() {
  const [visible, setVisible] = React.useState(true);
  const handleClose = () => setVisible(false);
  if (!visible) return null;
  return (
    <div className="pro-banner">
      <span className="pro-banner-icon" aria-label="duyuru">
        {/* Modern vektörel megafon icon */}
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path
            d="M3 10v4a1 1 0 0 0 1 1h2l3.29 3.29A1 1 0 0 0 11 18v-2h2a1 1 0 0 0 1-1v-2.18a7.001 7.001 0 0 0 0-9.64V5a1 1 0 0 0-1-1h-2V2a1 1 0 0 0-1.71-.71L6 4H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2l3.29 3.29A1 1 0 0 0 11 14v-2h2a1 1 0 0 0 1-1V9.82a7.001 7.001 0 0 0 0-9.64V5a1 1 0 0 0-1 1h-2V2a1 1 0 0 0-1.71-.71L6 4H4a1 1 0 0 0-1 1v5z"
            fill="#f59e42"
          />
        </svg>
      </span>
      <div className="pro-banner-content">
        <span className="pro-banner-title">Yeni Duyuru:</span>
        <span className="pro-banner-text">
          12 Temmuz: Proje teslimi için son gün!{" "}
          <span className="pro-banner-sep">|</span> 15 Temmuz: Mentor
          görüşmeleri başlıyor. <span className="pro-banner-sep">|</span>{" "}
          Haftalık quizler yakında aktif olacak.
        </span>
      </div>
      <button
        className="pro-banner-close"
        onClick={handleClose}
        aria-label="Kapat"
      >
        ×
      </button>
      <style>{`
        .pro-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.2rem;
          background: linear-gradient(90deg, #fffbe6 60%, #fef3c7 100%);
          color: #b45309;
          border-radius: 1.2rem;
          box-shadow: 0 4px 24px rgba(251,191,36,0.13);
          font-size: 1.13rem;
          font-weight: 500;
          padding: 1.1rem 2.2rem;
          margin: 0 auto 2rem auto;
          max-width: 900px;
          position: relative;
          border: 1.5px solid #fde68a;
          animation: pro-banner-fadein 0.7s cubic-bezier(.4,0,.2,1);
        }
        @keyframes pro-banner-fadein {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: none; }
        }
        .pro-banner-icon {
          flex-shrink: 0;
          margin-right: 0.7rem;
          display: flex;
          align-items: center;
        }
        .pro-banner-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .pro-banner-title {
          font-weight: 700;
          color: #b45309;
          font-size: 1.08rem;
          margin-bottom: 0.1rem;
        }
        .pro-banner-text {
          color: #92400e;
          font-size: 1.05rem;
        }
        .pro-banner-sep {
          color: #eab308;
          font-weight: 700;
          margin: 0 0.5rem;
        }
        .pro-banner-close {
          background: none;
          border: none;
          color: #b45309;
          font-weight: 700;
          font-size: 1.3rem;
          margin-left: 1.2rem;
          cursor: pointer;
          border-radius: 0.5rem;
          padding: 0.2rem 0.7rem;
          transition: background 0.18s, color 0.18s, transform 0.18s;
        }
        .pro-banner-close:hover {
          background: #fde68a;
          color: #92400e;
          transform: scale(1.15) rotate(8deg);
        }
        @media (max-width: 600px) {
          .pro-banner {
            flex-direction: column;
            font-size: 1rem;
            padding: 1rem 0.7rem;
            gap: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
}

// Modern Grid Duyurular Alanı (sayfa altı)
function DuyurularGrid() {
  const duyurular = [
    {
      tarihGun: "12",
      tarihAy: "Temmuz",
      baslik: "Proje Teslimi Son Günü",
      ozet: "Tüm öğrenciler için proje teslimi 12 Temmuz saat 23:59'a kadar yapılmalıdır. Eksik teslimler değerlendirmeye alınmayacaktır.",
      detay: "Detay",
    },
    {
      tarihGun: "15",
      tarihAy: "Temmuz",
      baslik: "Mentor Görüşmeleri Başlıyor",
      ozet: "Mentor randevularınızı kampüs panelinden planlayabilirsiniz. Görüşmeler online olarak Zoom üzerinden yapılacaktır.",
      detay: "Detay",
    },
    {
      tarihGun: "18",
      tarihAy: "Temmuz",
      baslik: "Yaz Okulu Başvuruları Açıldı",
      ozet: "2025 yaz okulu başvuruları 18 Temmuz'a kadar devam edecek. Başvuru ve ders seçimi için paneli kullanabilirsiniz.",
      detay: "Detay",
    },
    {
      tarihGun: "22",
      tarihAy: "Temmuz",
      baslik: "Haftalık Quizler Aktif!",
      ozet: "Her hafta yeni quizler panelde açılıyor. Katılım zorunlu olup, quiz sonuçları anında puanınıza yansıyacaktır.",
      detay: "Detay",
    },
    {
      tarihGun: "25",
      tarihAy: "Temmuz",
      baslik: "Kampüs Etkinlikleri Duyurusu",
      ozet: "Temmuz ayı boyunca çeşitli online ve yüz yüze etkinlikler düzenlenecektir. Katılım için detayları takip edin.",
      detay: "Detay",
    },
    {
      tarihGun: "30",
      tarihAy: "Temmuz",
      baslik: "Final Sınavı Takvimi Yayında",
      ozet: "2024-2025 Bahar dönemi final sınavı takvimi açıklandı. Sınav tarihlerinizi ve saatlerinizi panelden kontrol edebilirsiniz.",
      detay: "Detay",
    },
  ];
  return (
    <section className="duyurular-grid-listesi">
      <h2 className="duyurular-grid-title">DUYURULAR</h2>
      <div className="duyurular-grid">
        {duyurular.map((d, i) => (
          <div className="duyuru-grid-karti" key={i}>
            <div className="duyuru-tarih">
              <span className="duyuru-ay">{d.tarihAy}</span>
              <span className="duyuru-gun">{d.tarihGun}</span>
            </div>
            <div className="duyuru-icerik">
              <h3 className="duyuru-baslik">{d.baslik}</h3>
              <p className="duyuru-ozet">{d.ozet}</p>
              <button className="duyuru-btn">{d.detay}</button>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .duyurular-grid-listesi {
          max-width: 1200px;
          margin: 40px auto 60px auto;
          padding: 0 1rem;
        }
        .duyurular-grid-title {
          font-size: 2.1rem;
          font-weight: 700;
          margin-bottom: 2.2rem;
          color: #111827;
          letter-spacing: 0.5px;
        }
        .duyurular-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 2.2rem 2.2rem;
        }
        .duyuru-grid-karti {
          display: flex;
          background: #fff;
          border-radius: 1.1rem;
          box-shadow: 0 2px 12px rgba(30,60,120,0.08);
          padding: 1.5rem 1.2rem;
          align-items: flex-start;
          gap: 1.2rem;
          border-bottom: 2px solid #f3f4f6;
          transition: box-shadow 0.18s, transform 0.18s;
        }
        .duyuru-grid-karti:hover {
          box-shadow: 0 8px 32px rgba(99,102,241,0.13);
          transform: translateY(-4px) scale(1.03);
        }
        .duyuru-tarih {
          min-width: 70px;
          background: #ede9fe;
          border-radius: 0.7rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0.7rem 0.8rem 0.5rem 0.8rem;
          margin-right: 0.5rem;
        }
        .duyuru-ay {
          font-size: 1rem;
          color: #a78bfa;
          font-weight: 700;
          text-transform: capitalize;
        }
        .duyuru-gun {
          font-size: 2.1rem;
          font-weight: 800;
          color: #6d28d9;
          line-height: 1;
        }
        .duyuru-icerik {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .duyuru-baslik {
          font-size: 1.13rem;
          font-weight: 700;
          color: #22223b;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        .duyuru-ozet {
          font-size: 0.98rem;
          color: #444;
          margin-bottom: 1.1rem;
          line-height: 1.5;
        }
        .duyuru-btn {
          align-self: flex-start;
          background: #fff;
          border: 1.5px solid #a78bfa;
          color: #6d28d9;
          font-weight: 600;
          border-radius: 0.5rem;
          padding: 0.38rem 1.2rem;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.18s, color 0.18s, border 0.18s;
        }
        .duyuru-btn:hover {
          background: #a78bfa;
          color: #fff;
          border-color: #6d28d9;
        }
        @media (max-width: 900px) {
          .duyurular-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 600px) {
          .duyurular-grid {
            grid-template-columns: 1fr;
          }
          .duyurular-grid-title {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </section>
  );
}

export default function Kampus() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/giris");
  };
  return (
    <div className="kampus-panel-root min-h-screen bg-gray-100 py-10 px-4">
      <DuyuruBanner />
      <button className="pro-header-logout-fixed" onClick={handleLogout}>
        Çıkış
      </button>
      <div className="pro-header-card">
        <div className="pro-header-flex">
          <span className="pro-header-icon">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 2a2 2 0 0 1 2 2v2h-4V4a2 2 0 0 1 2-2zm-7 8a7 7 0 1 1 14 0A7 7 0 0 1 3 10zm7 8a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
                fill="#6366f1"
              />
            </svg>
          </span>
          <div>
            <h1 className="pro-header-title">
              Frovexis Kampüsü – Aktif Öğrenciler İçin Kontrol Paneli
            </h1>
            <p className="pro-header-desc">
              Projeler, ödevler, ilerleme puanları ve daha fazlası...
            </p>
          </div>
        </div>
        <style>{`
          .pro-header-logout-fixed {
            position: fixed;
            top: 32px;
            right: 48px;
            z-index: 50;
            padding: 10px 28px;
            background-color: #7c3aed;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 700;
            font-size: 1.13rem;
            box-shadow: 0 2px 12px rgba(124,51,237,0.13);
            transition: background 0.2s, transform 0.2s;
          }
          .pro-header-logout-fixed:hover {
            background-color: #5b21b6;
            transform: scale(1.07);
          }
          @media (max-width: 600px) {
            .pro-header-logout-fixed {
              top: 12px;
              right: 12px;
              padding: 8px 18px;
              font-size: 1rem;
            }
          }
          .pro-header-card {
            background: #fff;
            border-radius: 1.5rem;
            box-shadow: 0 6px 32px rgba(99,102,241,0.09);
            padding: 2.2rem 2.5rem 1.5rem 2.5rem;
            margin-bottom: 1.5rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 2.5rem;
            max-width: 100%;
          }
          .pro-header-flex {
            display: flex;
            align-items: center;
            gap: 1.2rem;
          }
          .pro-header-icon {
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, #6366f1 60%, #a5b4fc 100%);
            border-radius: 0.8rem;
            padding: 0.7rem;
            box-shadow: 0 2px 8px rgba(99,102,241,0.13);
          }
          .pro-header-title {
            font-size: 2rem;
            font-weight: 800;
            color: #1e293b;
            margin-bottom: 0.2rem;
            letter-spacing: -1px;
          }
          .pro-header-desc {
            color: #64748b;
            font-size: 1.1rem;
            margin-bottom: 0;
          }
          @media (max-width: 900px) {
            .pro-header-card {
              flex-direction: column;
              align-items: flex-start;
              padding: 1.2rem 1rem 1.2rem 1rem;
              gap: 1.2rem;
            }
            .pro-header-flex {
              flex-direction: row;
              gap: 0.7rem;
            }
            .pro-header-title {
              font-size: 1.3rem;
            }
            .pro-header-desc {
              font-size: 1rem;
            }
          }
        `}</style>
      </div>
      <div className="modul-stack">
        <div className="universal-card">
          <DersTakipKarti />
        </div>
        <div className="universal-card">
          <QuizAlani />
        </div>
        <div className="universal-card">
          <OdevTeslimKarti />
        </div>
        <div className="universal-card">
          <ProjeTeslimKarti />
        </div>
        <div className="universal-card">
          <MentorGorusmeKarti />
        </div>
        <div className="universal-card">
          <ProgressKarti />
        </div>
        <div className="universal-card">
          <DuyurularGrid />
        </div>
      </div>
      <style>{`
        .modul-stack > .universal-card {
          margin-bottom: 2.5rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
        .modul-stack > .universal-card:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}
