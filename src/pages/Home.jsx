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

const programDetails = [
  {
    title: "Başlangıç",
    details: [
      "6 Ay Eğitim (Haftada 2 gün)",
      "Front-End Temelleri: HTML, CSS, JS",
      "Canlı Dersler ve Kayıtlar",
      "Mentorluk: Haftalık Q&A",
      "Staj İmkanı: 1 ay uzaktan staj",
    ],
  },
  {
    title: "Orta Seviye",
    details: [
      "8 Ay Eğitim (Haftada 2 gün)",
      "React & Node.js, API, Proje Yönetimi",
      "Gerçek Proje Geliştirme",
      "Mentorluk: Birebir Kod İnceleme",
      "Staj: 2 ay uzaktan staj",
    ],
  },
  {
    title: "İleri Seviye",
    details: [
      "12 Ay Eğitim (Haftada 2 gün)",
      "Full-Stack: React, Node.js, DB, DevOps",
      "Referans Mektubu ve CV Desteği",
      "Mülakat Simülasyonu",
      "Staj: 3 ay uzaktan staj",
    ],
  },
];

const programIcons = ["��", "🧑‍💻", "🚀"];

function getPerPage() {
  if (window.innerWidth < 700) return 1;
  if (window.innerWidth < 1100) return 2;
  return 3;
}

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [perPage, setPerPage] = useState(getPerPage());
  const [openAllPrograms, setOpenAllPrograms] = useState(false);

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
      <h2 className="open-section-title programs-title-standalone">
        Programlarımız
      </h2>
      <div className="programs-section-bg">
        <section className="open-section programs-section">
          <div className="program-grid">
            {programs.map((p, i) => (
              <div className="open-program-card" key={i}>
                <span className="open-program-icon">{programIcons[i]}</span>
                <div className="open-program-title">{p.title}</div>
                <div className="open-program-title-bar"></div>
                <div className="open-program-desc">{p.desc}</div>
                <ul className="open-program-features">
                  {p.details.map((d, j) => (
                    <li key={j}>
                      <span className="feature-bulb">💡</span> {d}
                    </li>
                  ))}
                </ul>
                <button
                  className="open-program-btn details-button"
                  onClick={() => setOpenAllPrograms(!openAllPrograms)}
                >
                  {openAllPrograms ? "Kapat" : "Detaylar"}
                </button>
                {openAllPrograms && (
                  <div
                    className="open-program-accordion open"
                    style={{
                      maxHeight: "400px",
                      transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
                      overflow: "hidden",
                    }}
                  >
                    <ul className="open-program-details">
                      {programDetails[i].details.map((d, j) => (
                        <li key={j}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
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
      <h2 className="open-section-title why-title-standalone">
        Neden Frovexis?
      </h2>
      <div className="why-section-bg">
        <section className="open-section open-why">
          <div className="open-why-list grid-why">
            {advantages.map((a, i) => (
              <div className="open-why-item" key={i}>
                <span className="open-why-icon">{advantageIcons[i]}</span>
                <span className="open-why-text">{a}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="wave-divider"></div>
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
      <h2 className="open-section-title testimonials-title-standalone">
        Katılımcılarımız ne diyor?
      </h2>
      <div className="testimonials-section-bg">
        <section className="open-section open-testimonials">
          <div className="open-testimonial-slider">
            <button
              className="open-testimonial-arrow left"
              onClick={handlePrev}
              aria-label="Önceki Yorum"
            >
              &#8592;
            </button>
            <div className="open-testimonial-list no-scroll">
              {visibleTestimonials.map((t, i) => (
                <div className="open-testimonial-card active" key={i}>
                  <img
                    src={t.img}
                    alt={t.name}
                    className="open-testimonial-img"
                  />
                  <div className="open-testimonial-name">{t.name}</div>
                  <div className="open-testimonial-job">{t.job}</div>
                  <div className="open-testimonial-comment">{t.comment}</div>
                </div>
              ))}
            </div>
            <button
              className="open-testimonial-arrow right"
              onClick={handleNext}
              aria-label="Sonraki Yorum"
            >
              &#8594;
            </button>
          </div>
        </section>
      </div>
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
