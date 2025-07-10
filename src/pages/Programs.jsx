import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function NavbarComponent() {
  return (
    <nav className="w-full py-4 px-4 flex justify-between items-center bg-white shadow-sm mb-8">
      <Link to="/" className="text-2xl font-bold text-blue-700">
        Frovexis
      </Link>
      <div className="flex gap-6 text-base font-medium">
        <Link to="/programlar" className="hover:text-blue-600">
          Programlar
        </Link>
        <Link to="/hakkimizda" className="hover:text-blue-600">
          Hakkımızda
        </Link>
        <Link to="/sss" className="hover:text-blue-600">
          SSS
        </Link>
        <Link
          to="/basvuru"
          className="hover:bg-blue-600 hover:text-white border border-blue-600 rounded px-3 py-1 transition"
        >
          Başvuru
        </Link>
      </div>
    </nav>
  );
}

const programs = [
  {
    icon: "💡",
    title: "Başlangıç",
    desc: "Sıfırdan yazılıma başlayanlar için temel HTML, CSS ve JavaScript odaklı, uygulamalı ve mentör destekli bir eğitim.",
    oldPrice: "₺9.600",
    newPrice: "₺6.750",
    shopier: "https://www.shopier.com/37479752", // Gerçek link
    details: [
      "1. Ay: Web'e Giriş ve HTML5\n- Bilgisayarın ve internetin temelleri\n- Web nedir? HTTP, URL, tarayıcıların çalışma yapısı\n- HTML5 ile semantik etiketler (header, nav, section, article, footer)\n- Form elemanları, link, görsel, tablo, liste yapıları\n- Mini alıştırmalar ve HTML template oluşturma",
      "2. Ay: CSS3 ve Modern Tasarım\n- CSS seçiciler, renkler, yazı tipleri, margin/padding\n- Box model, display, position sistemleri\n- Flexbox ve Grid ile responsive layout'lar oluşturma\n- Media queries ile mobil uyumlu siteler\n- İlk tam sayfa: Mobil öncelikli tasarım projesi",
      "3. Ay: JavaScript Temelleri\n- Değişkenler (let, const), veri tipleri\n- Operatörler, koşullar (if, switch), döngüler (for, while)\n- Fonksiyonlar, scope, event listener yapısı\n- JavaScript ile temel hesaplamalar ve karar mekanizmaları\n- Konsol üzerinde debug ve temel hataları anlama",
      "4. Ay: DOM Manipülasyonu ve Etkileşimli Uygulamalar\n- HTML elementlerine erişim (getElementById, querySelector)\n- Olaylar (click, submit, keyup) ile kullanıcı etkileşimi\n- Input form verisi alma ve kontrol etme\n- Class ekleme/çıkarma, stilleri dinamik değiştirme\n- Küçük projeler: Sayaç, form validasyonu, açılır menü",
      "5. Ay: Uygulamalı Mini Projeler\n- Proje 1: Basit To-Do List (ekle, sil, filtrele)\n- Proje 2: Mobil uyumlu portfolyo sayfası\n- Proje 3: JavaScript ile hesap makinesi\n- Git ve GitHub'a giriş: versiyon kontrol ve repo oluşturma\n- Kod temizliği, açıklama yazımı, okuma pratikleri",
      "6. Ay: Final Projesi + Değerlendirme + Staj Hazırlığı\n- Gerçek brief'e dayalı final projesi: Çok sayfalı tanıtım sitesi\n- Mentorluk ile proje sunumu ve geribildirimler\n- Kişisel GitHub profili oluşturma + README yazımı\n- CV hazırlığı, dijital portfolyo düzenlemesi\n- Başarılı olanlara referans mektubu ve staj eşleştirmesi",
    ],
    button: "Detaylar",
  },
  {
    icon: "🧑‍💻",
    title: "Orta Seviye",
    desc: "Temel bilgisi olanlar için React, Node.js, MongoDB ve gerçekçi projeler odaklı ileri seviye uygulamalı eğitim.",
    oldPrice: "₺12.000",
    newPrice: "₺9.600",
    shopier: "https://www.shopier.com/37479822", // Gerçek link
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
    button: "Detaylar",
  },
  {
    icon: "🚀",
    title: "İleri Seviye",
    desc: "Kariyer hedefleyenler için ileri düzey full-stack eğitim, büyük proje geliştirme, CV & mülakat desteği ve referans mektubu.",
    oldPrice: "₺17.000",
    newPrice: "₺14.400",
    shopier: "https://www.shopier.com/37479939", // Gerçek link
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
    button: "Detaylar",
  },
];

export default function Programs() {
  const [open, setOpen] = useState([false, false, false]);

  const handleToggle = idx => {
    setOpen(prev => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  return (
    <>
      <Navbar />
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
                  <span className="program-icon">{p.icon}</span>
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
                <p className="program-desc">{p.desc}</p>
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
                  href={p.shopier}
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
          .price-area {
            background: #FAFAFA;
            border-radius: 12px;
            padding: 10px 14px 8px 14px;
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
            .price-area {
              padding: 8px 6px 6px 6px;
            }
            .card-price-new {
              font-size: 20px;
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
            .price-area {
              padding: 7px 2px 5px 2px;
            }
            .card-price-new {
              font-size: 1.13rem;
            }
            .discount-badge, .installment-badge {
              font-size: 12px;
              padding: 2px 6px;
            }
          }
        `}</style>
      </section>
    </>
  );
}
