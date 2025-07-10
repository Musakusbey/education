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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("email", email);
    formData.append("title", subject);
    formData.append("message", message);
    formData.append("file", selectedFile);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/odev-gonder", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Gönderildi! ✅");
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
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>📥 Ödev Teslim Formu</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
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
        <div className="form-group">
          <textarea
            placeholder="Açıklama"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            onChange={e => setSelectedFile(e.target.files[0])}
          />
          <button type="submit" className="upload-btn" disabled={loading}>
            {loading ? "Gönderiliyor..." : "Gönder"}
          </button>
        </div>
      </form>
    </div>
  );
}

function ProjeTeslimKarti() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("email", email);
    formData.append("title", subject);
    formData.append("message", message);
    formData.append("file", selectedFile);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/proje-gonder", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Proje gönderildi! ✅");
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
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>🚀 Proje Teslimi</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
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
        <div className="form-group">
          <textarea
            placeholder="Açıklama"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            onChange={e => setSelectedFile(e.target.files[0])}
          />
          <button type="submit" className="upload-btn" disabled={loading}>
            {loading ? "Gönderiliyor..." : "Gönder"}
          </button>
        </div>
      </form>
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
  const [loading, setLoading] = useState(false);

  const handleSelect = async value => {
    if (locked) return;
    setSelected(value);
    setLoading(true);
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
    setLoading(false);
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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    const user = await supabase.auth.getUser();
    const user_id = user.data.user?.id;
    if (!user_id) {
      setError("Kullanıcı oturumu bulunamadı.");
      setLoading(false);
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
    setLoading(false);
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
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={onClose}
            disabled={loading}
          >
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

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="duyuru-banner">
      <span className="duyuru-icon" role="img" aria-label="duyuru">
        📢
      </span>
      <span className="duyuru-text">
        <b>Yeni duyuru:</b> 12 Temmuz Proje teslimi için son gün! &nbsp;|&nbsp;
        15 Temmuz Mentor görüşmeleri başlıyor. &nbsp;|&nbsp; Haftalık quizler
        yakında aktif olacak.
      </span>
      <button className="duyuru-close" onClick={handleClose}>
        Kapat ✕
      </button>
      <style>{`
        .duyuru-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.2rem;
          background: linear-gradient(90deg, #fef9c3 60%, #fde68a 100%);
          color: #92400e;
          border-radius: 1.2rem;
          box-shadow: 0 4px 24px rgba(251,191,36,0.13);
          font-size: 1.13rem;
          font-weight: 600;
          padding: 1.1rem 2.2rem;
          margin: 0 auto 2rem auto;
          max-width: 900px;
          position: relative;
        }
        .duyuru-icon {
          font-size: 1.5rem;
          margin-right: 0.5rem;
        }
        .duyuru-text {
          flex: 1;
        }
        .duyuru-close {
          background: none;
          border: none;
          color: #92400e;
          font-weight: 700;
          font-size: 1.1rem;
          margin-left: 1.2rem;
          cursor: pointer;
          border-radius: 0.5rem;
          padding: 0.2rem 0.7rem;
          transition: background 0.18s;
        }
        .duyuru-close:hover {
          background: #fde68a;
        }
        @media (max-width: 600px) {
          .duyuru-banner {
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
  const [loading, setLoading] = useState(false);
  const ad = "öğrenci"; // Supabase ile isim alınacaksa eklenebilir
  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    navigate("/giris");
  };
  return (
    <div className="kampus-panel-root min-h-screen bg-gray-100 py-10 px-4">
      <DuyuruBanner />
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Üst header ve başlık */}
        <div className="header-container">
          <p>Hoş geldin, {ad}!</p>
          <button
            className="logout-btn"
            onClick={handleLogout}
            disabled={loading}
          >
            Çıkış
          </button>
        </div>
        <h1 className="page-title">
          🎓 Frovexis Kampüsü – Aktif Öğrenciler İçin Kontrol Paneli
        </h1>
        <p className="page-subtitle">
          Projeler, ödevler, ilerleme puanları ve daha fazlası…
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Modern Ödev Teslimi Kartı */}
          <OdevTeslimKarti />
          {/* Modern Proje Teslimi Kartı */}
          <ProjeTeslimKarti />
          {/* Modern Quiz/Sınav Kartı */}
          <QuizAlani />
          {/* Modern Ders Takibi & Katılım Kartı */}
          <DersTakipKarti />
          {/* Modern Mentor Görüşmeleri Kartı */}
          <MentorGorusmeKarti />
          {/* Modern Puan & İlerleme Kartı */}
          <ProgressKarti />
        </div>
        {/* Açılır Duyurular Alanı */}
        {/* <DuyurularAccordion /> */}
        <DuyurularGrid />
      </div>
    </div>
  );
}
