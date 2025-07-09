import OdevTeslim from "./OdevTeslim";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import QuizAlani from "../components/QuizAlani";

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
  return (
    <div className="card">
      <h3 className="card-title">
        <span role="img" aria-label="mentor">
          💬
        </span>{" "}
        Mentor Görüşmeleri
      </h3>
      <p className="card-subtext">
        Mentor ile birebir görüşme planlamak için aşağıdan seçim yapabilirsin.
      </p>
      <div className="card-buttons">
        <button className="btn-primary">🗓 Planla</button>
      </div>
    </div>
  );
}

function PuanIlerlemeKarti() {
  return (
    <div className="card">
      <h3 className="card-title">
        <span role="img" aria-label="puan">
          📊
        </span>{" "}
        Puan & İlerleme
      </h3>
      <p className="card-subtext">
        Bu ayki aktiflik: <strong>%80</strong>
        <br />
        Toplam teslim: <strong>5 ödev</strong>, <strong>2 proje</strong>
      </p>
    </div>
  );
}

function DuyuruKarti() {
  return (
    <div className="card">
      <h3 className="card-title">
        <span role="img" aria-label="duyuru">
          📢
        </span>{" "}
        Duyurular & Bildirimler
      </h3>
      <ul className="announcement-list">
        <li>
          <strong>12 Temmuz:</strong> Proje teslimi için son gün!
        </li>
        <li>
          <strong>15 Temmuz:</strong> Mentor görüşmeleri başlıyor.
        </li>
        <li>Haftalık quizler yakında aktif olacak.</li>
      </ul>
    </div>
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
          <PuanIlerlemeKarti />
          {/* Modern Duyurular & Bildirimler Kartı */}
          <DuyuruKarti />
        </div>
      </div>
    </div>
  );
}
