import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "./HeroSection";
import { FaWhatsapp } from "react-icons/fa";
import ImpactStats from "../components/ImpactStats";
import Mezunlarimiz from "../components/Mezunlarimiz";
import LogoSlider from "../components/LogoSlider";
import FAQSection from "../components/FAQSection";
import Steps from "../components/Steps";

const programs = [
  {
    title: "Başlangıç",
    desc: "Sıfırdan yazılıma başlayanlar için temel HTML, CSS ve JavaScript odaklı, uygulamalı ve mentör destekli bir eğitim.",
    oldPrice: "₺9.600",
    newPrice: "₺6.750",
    details: [
      "1. Ay: Web'e Giriş ve HTML5\n- Bilgisayarın ve internetin temelleri\n- Web nedir? HTTP, URL, tarayıcıların çalışma yapısı\n- HTML5 ile semantik etiketler (header, nav, section, article, footer)\n- Form elemanları, link, görsel, tablo, liste yapıları\n- Mini alıştırmalar ve HTML template oluşturma",
      "2. Ay: CSS3 ve Modern Tasarım\n- CSS seçiciler, renkler, yazı tipleri, margin/padding\n- Box model, display, position sistemleri\n- Flexbox ve Grid ile responsive layout'lar oluşturma\n- Media queries ile mobil uyumlu siteler\n- İlk tam sayfa: Mobil öncelikli tasarım projesi",
      "3. Ay: JavaScript Temelleri\n- Değişkenler (let, const), veri tipleri\n- Operatörler, koşullar (if, switch), döngüler (for, while)\n- Fonksiyonlar, scope, event listener yapısı\n- JavaScript ile temel hesaplamalar ve karar mekanizmaları\n- Konsol üzerinde debug ve temel hataları anlama",
      "4. Ay: DOM Manipülasyonu ve Etkileşimli Uygulamalar\n- HTML elementlerine erişim (getElementById, querySelector)\n- Olaylar (click, submit, keyup) ile kullanıcı etkileşimi\n- Input form verisi alma ve kontrol etme\n- Class ekleme/çıkarma, stilleri dinamik değiştirme\n- Küçük projeler: Sayaç, form validasyonu, açılır menü",
      "5. Ay: Uygulamalı Mini Projeler\n- Proje 1: Basit To-Do List (ekle, sil, filtrele)\n- Proje 2: Mobil uyumlu portfolyo sayfası\n- Proje 3: JavaScript ile hesap makinesi\n- Git ve GitHub'a giriş: versiyon kontrol ve repo oluşturma\n- Kod temizliği, açıklama yazımı, okuma pratikleri",
      "6. Ay: Final Projesi + Değerlendirme + Staj Hazırlığı\n- Gerçek brief'e dayalı final projesi: Çok sayfalı tanıtım sitesi\n- Mentorluk ile proje sunumu ve geribildirimler\n- Kişisel GitHub profili oluşturma + README yazımı\n- CV hazırlığı, dijital portfolyo düzenlemesi\n- Başarılı olanlara referans mektubu ve staj eşleştirmesi",
    ],
    btn: "Detaylar",
  },
  {
    title: "Orta Seviye",
    desc: "Temel bilgisi olanlar için React, Node.js, MongoDB ve gerçekçi projeler odaklı ileri seviye uygulamalı eğitim.",
    oldPrice: "₺12.000",
    newPrice: "₺9.600",
    details: [
      "1. Ay: React'e Giriş ve Bileşen Yapısı\n- React kurulumu, proje yapısı ve JSX kullanımı\n- Component mantığı: fonksiyonel bileşenler, props ve state\n- useState ve temel event handling\n- React Developer Tools ile debug pratiği",
      "2. Ay: React Router ve Proje Mimarisi\n- react-router-dom ile çoklu sayfa yapısı (SPA)\n- Sayfa geçişleri, dinamik parametreler, 404 sayfası\n- Dosya yapısında component, page, layout ayrımı\n- Form yönetimi ve basit validasyon (yönlendirme sonrası mesajlar)",
      "3. Ay: React'te Orta Seviye Mantık\n- useEffect ile veri alma (fetch, axios)\n- Listeleme, filtreleme, yükleniyor durumu (loading states)\n- useRef, useMemo gibi hook'larla performans kontrolü\n- JSON verilerle kart oluşturma (dinamik içerik gösterimi)",
      "4. Ay: Node.js ve Express.js Giriş\n- Node.js ortamı, npm kullanımı ve modül yapısı\n- Express ile temel REST API oluşturma\n- Middleware kullanımı, hata yönetimi\n- Postman ile API testleri yapma\n- Basit bir not tutma API'si geliştirme",
      "5. Ay: MongoDB ile Veri Tabanı Entegrasyonu\n- MongoDB yapısı, Compass ile görsel arayüz kullanımı\n- Mongoose ile model oluşturma ve bağlantı kurma\n- CRUD işlemleri: kayıt ekleme, silme, güncelleme, listeleme\n- API ile Frontend arasında veri akışı\n- Proje: Kullanıcı kayıt sistemi",
      "6. Ay: Auth Sistemi ve Güvenlik\n- Şifreleme (bcrypt), JWT ile token oluşturma\n- Login, register sistemleri ve yetkilendirme\n- Giriş yapmadan erişilemeyen sayfalar (private route)\n- Kullanıcıya özel veri gösterimi",
      "7. Ay: Full-Stack Mini Proje\n- Kullanıcı tabanlı veri yönetimi (örneğin not, blog, görev)\n- Admin paneli, kullanıcı rollerine göre erişim\n- Frontend ile backend'in tam entegrasyonu\n- Git ile versiyonlama, deployment hazırlığı",
      "8. Ay: Proje Sunumu ve Geliştirici Hazırlığı\n- Final proje kodlarının düzenlenmesi ve belgelenmesi\n- GitHub profilinin optimize edilmesi (README, commits)\n- Demo video çekimi, proje sunumu hazırlığı\n- Mentor geri bildirimi + Mezuniyet Belgesi",
    ],
    btn: "Detaylar",
  },
  {
    title: "İleri Seviye",
    desc: "Kariyer hedefleyenler için ileri düzey full-stack eğitim, büyük proje geliştirme, CV & mülakat desteği ve referans mektubu.",
    oldPrice: "₺17.000",
    newPrice: "₺14.400",
    details: [
      "1. Ay: İleri React – Uygulama Mimarisi\n- Proje klasör yapısının ileri düzey planlanması (atomic design, modular yapılar)\n- Context API ile global state yönetimi\n- useReducer, custom hook'lar yazma\n- Performans optimizasyonları: React.memo, lazy loading, code splitting",
      "2. Ay: Redux Toolkit ile Global State Yönetimi\n- Redux mantığı: store, reducer, actions\n- Redux Toolkit kurulumu, createSlice kullanımı\n- Asenkron veri çekimi (createAsyncThunk)\n- DevTools entegrasyonu ve middleware kullanımı",
      "3. Ay: Gelişmiş Routing ve SEO\n- Nested routing yapıları\n- Route guard'lar, dinamik parametrelerle veri yönetimi\n- Meta tag yönetimi, Open Graph etiketleri\n- Yapılandırılmış veri (schema.org) kullanımı",
      "4. Ay: Next.js ile SSR, SSG ve SEO Uyumlu Uygulamalar\n- Next.js'e geçiş ve SSR/CSR farkları\n- getStaticProps ve getServerSideProps kullanımı\n- SEO uyumlu sayfa oluşturma (meta, og:image, canonical url)\n- Dinamik sayfalar ve API Routes",
      "5. Ay: Express.js ile Kurumsal API Geliştirme\n- Role-based access control (RBAC)\n- JWT refresh token sistemi\n- Mail gönderme (nodemailer), dosya yükleme (Multer)\n- Gelişmiş hata yönetimi ve logger sistemi",
      "6. Ay: MongoDB, Mongoose ve Veri Modelleme\n- İlişkisel yapı kurma (populate, sub-documents)\n- Mongoose schema validation ve lifecycle hook'lar\n- Filtreleme, sıralama, arama işlemleri\n- Pagination + sayfalama API performansı",
      "7. Ay: DevOps ve Yayınlama Süreçleri\n- CI/CD mantığı ve otomasyon (GitHub Actions)\n- .env dosyası kullanımı ve güvenlik\n- Projeyi Vercel, Render veya Railway ile canlıya alma\n- Uptime, hataları loglama, test için staging ortamı kurma",
      "8. Ay: Geliştirici Test Süreçleri\n- Test yapıları: Unit test, integration test nedir?\n- React Testing Library ile bileşen testi\n- Postman + Jest ile backend API testleri\n- CI/CD ile test entegresi",
      "9. Ay: Büyük Proje #1 – Admin Panelli Web Uygulaması\n- Gerçek brief'e göre proje geliştirme (örnek: Blog, CRM, Eğitim Paneli)\n- Kullanıcı yönetimi, roller, filtreli veri\n- Admin ekranları, panel içi işlemler ve veri analizleri\n- Proje dökümantasyonu ve commit standartları",
      "10. Ay: Büyük Proje #2 – Takım Çalışmasıyla Ürün Geliştirme\n- Ekip içinde görev paylaşımı (issue yönetimi, branch sistemi)\n- Git flow, pull request ve review süreçleri\n- Discord ya da GitHub Projects üzerinden proje ilerleme takibi\n- Haftalık demo sunumları + retrospektif",
      "11. Ay: Mülakat Hazırlığı ve Kariyer Destek\n- Teknik mülakat türleri (algoritma, sistem tasarımı, live coding)\n- Mock interview (simülasyon görüşmeler)\n- CV analiz, Linkedin optimizasyonu\n- Portfolyo geri bildirimi + kişisel marka oluşturma",
      "12. Ay: Final Proje, Mezuniyet ve Referans\n- Tüm bilgi ve becerileri içeren final proje teslimi\n- Jüri değerlendirmesi + demo günü sunumu\n- Mezun belgesi + Referans mektubu\n- İş yönlendirmesi ve staj desteği (seçili adaylara özel)",
    ],
    btn: "Detaylar",
  },
];

const shopierLinks = [
  "https://www.shopier.com/37479752",
  "https://www.shopier.com/37479822",
  "https://www.shopier.com/37479939",
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
  "��", // Sertifika
  "👥", // Topluluk
];

export default function Home() {
  const [open, setOpen] = useState([false, false, false]);

  const handleToggle = idx => {
    setOpen(prev => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  return (
    <div>
      <Navbar />
      {/* Hero */}
      <HeroSection />
      <ImpactStats />
      <div
        className="partner-section"
        style={{
          width: "100%",
          margin: "0 auto",
          background: "#fff",
          padding: "0 0 2rem 0",
        }}
      >
        <h2
          className="partner-title"
          style={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: "2rem",
            marginBottom: "1.5rem",
          }}
        >
          Kurumsal Partnerlerimiz
        </h2>
        <LogoSlider />
      </div>
      <Mezunlarimiz />
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
        <div className="programs-grid">
          {programs.map((p, i) => (
            <div
              className="program-card"
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div>
                <div className="program-header">
                  <span className="program-icon">{["💡", "🧑‍💻", "🚀"][i]}</span>
                  <span className="program-title">{p.title}</span>
                </div>
                <div className="price-area">
                  <div className="price-row">
                    <span className="card-price-old">{p.oldPrice}</span>
                    <span className="card-price-new">{p.newPrice}</span>
                  </div>
                  <div className="price-labels">
                    <span className="discount-badge">% Tasarruf</span>
                    <span className="installment-badge">
                      Peşin fiyatına taksit
                    </span>
                  </div>
                </div>
                <div className="program-desc">{p.desc}</div>
                <ul className="program-list">
                  {p.details.slice(0, 4).map((d, k) => (
                    <li key={k} style={{ fontSize: 16 }}>
                      <span role="img" aria-label="detay">
                        💡
                      </span>{" "}
                      {d.split("\n")[0]}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  flexDirection: "row",
                  gap: 8,
                  width: "100%",
                }}
              >
                <button
                  className="program-btn"
                  style={{ flex: 1, marginTop: 0, width: "auto" }}
                  onClick={() => handleToggle(i)}
                >
                  Detaylar
                </button>
                <a
                  href={shopierLinks[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    background: "#43a047",
                    color: "#fff",
                    borderRadius: 8,
                    fontWeight: 600,
                    padding: "10px 24px",
                    fontSize: 16,
                    textAlign: "center",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s",
                  }}
                  onMouseOver={e =>
                    (e.currentTarget.style.background = "#388e3c")
                  }
                  onMouseOut={e =>
                    (e.currentTarget.style.background = "#43a047")
                  }
                >
                  Satın Al
                </a>
              </div>
              {open[i] && (
                <div className="program-details">
                  {p.details.map((d, k) => {
                    const [ay, ...altlar] = d.split("\n");
                    return (
                      <div key={k} style={{ marginBottom: 14 }}>
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>
                          {ay}
                        </div>
                        <ul style={{ paddingLeft: 18, margin: 0 }}>
                          {altlar.map((line, idx) => (
                            <li key={k + "-" + idx} style={{ marginBottom: 2 }}>
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <style>{`
        .programs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          justify-content: center;
          align-items: stretch;
        }
        .program-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.07);
          padding: 28px 24px 24px 24px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 350px;
          min-width: 260px;
          min-height: 320px;
          position: relative;
          transition: box-shadow 0.2s;
        }
        .program-card:hover {
          box-shadow: 0 12px 32px rgba(0,0,0,0.13);
        }
        .program-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .program-icon {
          font-size: 32px;
          color: #ffc107;
        }
        .program-title {
          font-weight: 700;
          font-size: 22px;
          color: #212529;
        }
        .price-area {
          background: #f9fafb;
          border-radius: 12px;
          padding: 18px 16px 12px 16px;
          margin-bottom: 12px;
          margin-top: 2px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
          width: 100%;
          gap: 4px;
        }
        .price-row {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 2px;
        }
        .card-price-old {
          color: #e53935;
          text-decoration: line-through;
          font-weight: 500;
          font-size: 15px;
          margin-right: 2px;
        }
        .card-price-new {
          color: #007bff;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 0px;
          letter-spacing: 0.5px;
        }
        .price-labels {
          display: flex;
          gap: 8px;
          margin-top: 2px;
        }
        .discount-badge {
          background: #FFFBEA;
          color: #AA8000;
          border-radius: 8px;
          padding: 3px 8px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.2px;
          border: 1px solid #FFE6A0;
        }
        .installment-badge {
          background: #4CAF50;
          color: #fff;
          border-radius: 8px;
          padding: 3px 8px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.2px;
        }
        .program-desc {
          color: #212529;
          font-size: 16px;
          margin-bottom: 12px;
        }
        .program-list {
          color: #212529;
          font-size: 16px;
          margin-bottom: 0;
          padding-left: 18px;
          list-style: disc inside;
        }
        .program-btn {
          margin-top: 18px;
          padding: 10px 24px;
          background: #007bff;
          color: #fff;
          border-radius: 8px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          width: 120px;
          font-size: 16px;
          align-self: flex-start;
          transition: background 0.2s;
        }
        .program-btn:hover {
          background: #0056b3;
        }
        .program-details {
          margin-top: 18px;
          background: #f5f9ff;
          border: 1px solid #e3eafc;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
          padding: 18px 16px;
          width: 100%;
          max-height: 320px;
          overflow-y: auto;
          position: absolute;
          left: 0;
          top: 100%;
          z-index: 10;
        }
        @media (max-width: 900px) {
          .programs-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .program-card {
            max-width: 98vw;
            min-width: unset;
            padding: 18px 6px;
          }
          .program-details {
            position: static;
            max-height: 400px;
          }
        }
        @media (max-width: 600px) {
          .program-card {
            font-size: 1.13rem;
            padding: 10px 2px;
          }
          .programs-grid {
            gap: 10px;
          }
          .program-title {
            font-size: 1.2rem;
          }
          .program-btn {
            font-size: 1.08rem;
            width: 100%;
          }
          .program-details {
            font-size: 1.01rem;
            padding: 10px 4px;
          }
        }
      `}</style>
      <Steps />
      <FAQSection />
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
