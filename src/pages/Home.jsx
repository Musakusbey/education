import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "./HeroSection";
import { FaWhatsapp } from "react-icons/fa";

const programs = [
  {
    title: "Başlangıç",
    desc: "Yazılıma sıfırdan başlamak isteyenler için temel eğitim ve staj fırsatı.",
    details: [
      "6 Ay Eğitim",
      "Front-End Temelleri",
      "Canlı Dersler",
      "Staj İmkanı",
    ],
    btn: "Detaylar",
  },
  {
    title: "Orta Seviye",
    desc: "Temel bilgisi olanlar için ileri seviye projeler ve mentorluk.",
    details: ["8 Ay Eğitim", "React & Node.js", "Gerçek Proje", "Mentorluk"],
    btn: "Detaylar",
  },
  {
    title: "İleri Seviye",
    desc: "Kariyer hedefleyenler için full-stack eğitim, referans ve iş desteği.",
    details: ["12 Ay Eğitim", "Full-Stack", "Referans Mektubu", "CV & Mülakat"],
    btn: "Detaylar",
  },
];

const advantages = [
  "%100 Online ve Esnek Eğitim",
  "Birebir Mentorluk ve Destek",
  "Gerçek Proje Deneyimi",
  "Staj ve Referans Mektubu",
  "Sertifika ve CV Desteği",
  "Güçlü Topluluk ve Networking",
];

const testimonials = [
  {
    name: "Ayşe Yılmaz",
    job: "Front-End Developer",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    comment:
      "Frovexis sayesinde yazılım kariyerime sağlam bir başlangıç yaptım. Canlı dersler ve mentorluk desteği harikaydı!",
  },
  {
    name: "Mehmet Demir",
    job: "Full-Stack Developer",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    comment:
      "Gerçek projeler ve birebir mentorluk ile iş bulmam çok kolaylaştı. Referans mektubu çok işime yaradı.",
  },
  {
    name: "Elif Kaya",
    job: "Jr. Software Engineer",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    comment:
      "Sıfırdan yazılım öğrenmek isteyen herkese tavsiye ederim. Topluluk ve destek mükemmel!",
  },
  {
    name: "Burak Şahin",
    job: "Back-End Developer",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    comment:
      "Mentorlar çok ilgiliydi, gerçek projelerle öğrendim. Frovexis ile iş bulmak kolaylaştı.",
  },
  {
    name: "Zeynep Aksoy",
    job: "UI/UX Designer",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    comment:
      "Eğitimler çok anlaşılır ve güncel. Staj ve referans desteğiyle sektöre hızlı girdim.",
  },
  {
    name: "Ali Can",
    job: "Mobile Developer",
    img: "https://randomuser.me/api/portraits/men/23.jpg",
    comment:
      "Frovexis'te topluluk çok güçlü, networking sayesinde iş buldum. Herkese öneririm!",
  },
];

const advantageIcons = [
  "🌐", // Online
  "👨‍🏫", // Mentorluk
  "🛠️", // Proje
  "🎓", // Staj
  "📜", // Sertifika
  "��", // Topluluk
];

const programIcons = ["", "🧑‍💻", "🚀"];

function getPerPage() {
  if (window.innerWidth < 700) return 1;
  if (window.innerWidth < 1100) return 2;
  return 3;
}

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [perPage, setPerPage] = useState(getPerPage());

  useEffect(() => {
    const handleResize = () => setPerPage(getPerPage());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = testimonials.length;
  const getVisibleTestimonials = () => {
    let arr = [];
    for (let i = 0; i < perPage; i++) {
      arr.push(testimonials[(activeTestimonial + i) % total]);
    }
    return arr;
  };
  const visibleTestimonials = getVisibleTestimonials();

  const handlePrev = () => {
    setActiveTestimonial(prev => (prev - perPage + total) % total);
  };
  const handleNext = () => {
    setActiveTestimonial(prev => (prev + perPage) % total);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Hero */}
      <HeroSection />

      {/* Programlar */}
      <section className="section">
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            color: "#212529",
            marginBottom: 48,
            textAlign: "center",
          }}
        >
          Programlarımız
        </h2>
        <div className="cards-row">
          {programs.map((p, i) => (
            <div
              className="card"
              key={i}
              style={{
                flex: 1,
                maxWidth: 350,
                minWidth: 260,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <span style={{ fontSize: 32, color: "#ffc107" }}>
                  {programIcons[i]}
                </span>
                <span
                  style={{ fontWeight: 700, fontSize: 22, color: "#212529" }}
                >
                  {p.title}
                </span>
              </div>
              <div style={{ color: "#212529", fontSize: 16, marginBottom: 12 }}>
                {p.desc}
              </div>
              <ul style={{ color: "#212529", fontSize: 16, marginBottom: 12 }}>
                {p.details.map((d, j) => (
                  <li key={j}>
                    <span className="feature-bulb">💡</span> {d}
                  </li>
                ))}
              </ul>
              <button
                style={{
                  marginTop: 16,
                  padding: "10px 24px",
                  background: "#007bff",
                  color: "#fff",
                  borderRadius: 8,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {p.btn}
              </button>
            </div>
          ))}
        </div>
      </section>
      <div className="wave-divider">
        <svg
          viewBox="0 0 1440 120"
          width="100vw"
          height="120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFB74D" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>
          </defs>
          <path
            d="M0,60 C360,180 1080,0 1440,90 L1440,120 L0,120 Z"
            fill="url(#waveGradient)"
          />
        </svg>
      </div>
      {/* Neden Frovexis */}
      <section className="section">
        <h2
          style={{
            fontSize: "2.2rem",
            fontWeight: 800,
            color: "#212529",
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          Neden Frovexis?
        </h2>
        <div className="cards-row">
          {advantages.map((a, i) => (
            <div
              className="card"
              key={i}
              style={{
                flex: 1,
                maxWidth: 340,
                minWidth: 200,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 36, color: "#007bff", marginBottom: 12 }}>
                {advantageIcons[i]}
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  color: "#212529",
                  marginBottom: 8,
                }}
              >
                {a}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Katılımcı Yorumları */}
      <section className="section">
        <h2
          style={{
            fontSize: "2.2rem",
            fontWeight: 800,
            color: "#212529",
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          Katılımcılarımız ne diyor?
        </h2>
        <div className="cards-row">
          {testimonials.slice(0, 3).map((t, i) => (
            <div
              className="card"
              key={i}
              style={{
                flex: 1,
                maxWidth: 340,
                minWidth: 220,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={t.img}
                alt={t.name}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: 16,
                  border: "3px solid #f5f9ff",
                }}
              />
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#212529",
                  marginBottom: 4,
                }}
              >
                {t.name}
              </div>
              <div style={{ fontSize: 15, color: "#007bff", marginBottom: 8 }}>
                {t.job}
              </div>
              <div style={{ fontSize: 15, color: "#212529", opacity: 0.85 }}>
                {t.comment}
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="wave-divider">
        <svg
          viewBox="0 0 1440 80"
          width="100%"
          height="80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFB74D" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>
          </defs>
          <path
            d="M0,40 C360,120 1080,0 1440,60 L1440,80 L0,80 Z"
            fill="url(#waveGradient)"
          />
        </svg>
      </div>

      {/* Footer */}
      <footer className="footer open-footer">
        <div className="open-footer-inner">
          <div className="open-footer-brand">
            <span className="open-footer-logo">Frovexis</span>
            <span className="open-footer-slogan">
              Türkiye'nin Modern Yazılım Eğitim Platformu
            </span>
          </div>
          <div className="open-footer-links">
            <a href="/programlar">Programlar</a>
            <a href="/hakkimizda">Hakkımızda</a>
            <a href="/basvuru">Başvuru</a>
          </div>
          <div className="open-footer-social">
            <a
              className="wa-link"
              href="https://wa.me/905414315925"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="wa-icon" />
              0541 431 59 25
            </a>
          </div>
        </div>
        <div className="open-footer-bottom">
          © 2025 Frovexis. Tüm hakları saklıdır. &nbsp;|&nbsp; KVKK & Gizlilik
          &nbsp;|&nbsp; <a href="mailto:info@frovexis.com">info@frovexis.com</a>
        </div>
      </footer>
    </div>
  );
}
