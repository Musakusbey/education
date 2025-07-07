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
    features: [
      "6 Ay Eğitim",
      "Front-End Temelleri (HTML, CSS, JS)",
      "Canlı Ders + Kayıt",
      "Temel Staj İmkânı",
      "Sıfırdan başlayanlar için rehberlik",
    ],
    button: "Detaylı İçeriği Gör",
    details: [
      "Hafta 1: Bilgisayar okuryazarlığı, yazılım nedir, HTML yapısı",
      "Hafta 2: HTML etiketleri ve form yapıları",
      "Hafta 3: CSS temel kavramlar – class, id, box model",
      "Hafta 4: Responsive tasarım (media query, mobil uyum)",
      "Hafta 5: Flexbox & Grid sistemleri",
      "Hafta 6: JavaScript'e giriş – değişkenler, veri tipleri",
      "Hafta 7: JS operatörler, koşullar ve döngüler",
      "Hafta 8: Fonksiyonlar & event handling",
      "Hafta 9: DOM işlemleri – element seçme, değiştirme",
      "Hafta 10: Mini proje: Kayıt Formu uygulaması",
      "Hafta 11: Git ve GitHub kullanımı, versiyonlama",
      "Hafta 12: Bitirme projesi: Basit Portfolyo Sayfası + Sertifika",
    ],
  },
  {
    icon: "🧑‍💻",
    title: "Orta Seviye",
    features: [
      "8 Ay Eğitim",
      "React & Node.js",
      "Canlı Proje Geliştirme",
      "Grup Mentorluk Oturumları",
      "Haftalık Kodlama Testleri",
    ],
    button: "Detaylı İçeriği Gör",
    details: [
      "Hafta 1: JavaScript review + ES6 yapılar",
      "Hafta 2: React.js'e giriş – bileşen yapısı",
      "Hafta 3: Props, State, Event Binding",
      "Hafta 4: useEffect ve lifecycle mantığı",
      "Hafta 5: React Router ve SPA",
      "Hafta 6: Form yapıları & validasyon",
      "Hafta 7: Proje yönetimi (Trello, Git branching)",
      "Hafta 8: Proje: Blog Arayüzü",
      "Hafta 9: Node.js'e giriş – Express kurulum",
      "Hafta 10: REST API mantığı",
      "Hafta 11: MongoDB & Mongoose",
      "Hafta 12: CRUD işlemleri ile proje geliştirme",
      "Hafta 13: JWT ve kullanıcı auth sistemi",
      "Hafta 14: React ile backend entegrasyonu",
      "Hafta 15: Proje yayına alma (Render/Netlify)",
      "Hafta 16: Final proje sunumu + mentör feedback",
    ],
  },
  {
    icon: "🚀",
    title: "İleri Seviye",
    features: [
      "12 Ay Full-Stack Eğitim",
      "Referans Mektubu + CV & Mülakat Hazırlığı",
      "LinkedIn Profili ve Portfolyo Desteği",
      "3 Ay Staj İmkanı (gerçek proje üzerinden)",
      "Kişisel mentor eşleşmesi",
    ],
    button: "Detaylı İçeriği Gör",
    details: [
      "Hafta 1-2: GitHub zaferi: İşe uygun profil, issue'lar",
      "Hafta 3-4: İleri düzey React (context API, custom hook)",
      "Hafta 5-6: Next.js ile SSR ve sayfa optimizasyonu",
      "Hafta 7-8: Tailwind ile ileri seviye arayüz tasarımı",
      "Hafta 9-10: Node.js + TypeScript uyumlu yapı",
      "Hafta 11-12: PostgreSQL ve Prisma ORM",
      "Hafta 13-14: Stripe ile ödeme entegrasyonu",
      "Hafta 15-16: Docker'a giriş ve backend konteynerizasyon",
      "Hafta 17-18: CI/CD, GitHub Actions ve otomatik test",
      "Hafta 19-20: Full-stack admin panel projesi",
      "Hafta 21-22: CV hazırlama, LinkedIn düzeni, mülakat simülasyonları",
      "Hafta 23: Staj & freelance platform önerileri",
      "Hafta 24: Portfolyo + canlı sunum günü + referans mektubu",
    ],
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
        <div className="cards-row">
          {programs.map((p, i) => (
            <div
              className="card"
              key={i}
              style={{
                flex: 1,
                maxWidth: 350,
                minWidth: 260,
                minHeight: 420,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <span style={{ fontSize: 32, color: "#ffc107" }}>
                    {p.icon}
                  </span>
                  <span
                    style={{ fontWeight: 700, fontSize: 22, color: "#212529" }}
                  >
                    {p.title}
                  </span>
                </div>
                <ul
                  style={{ color: "#212529", fontSize: 16, marginBottom: 12 }}
                >
                  {p.features.map((f, j) => (
                    <li key={j}>{f}</li>
                  ))}
                </ul>
              </div>
              <div style={{ marginTop: "auto" }}>
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
                    width: "100%",
                  }}
                  onClick={() => handleToggle(i)}
                >
                  {p.button}
                </button>
                {open[i] && (
                  <div
                    style={{
                      marginTop: 16,
                      padding: 16,
                      background: "#f5f9ff",
                      border: "1px solid #e3eafc",
                      borderRadius: 12,
                    }}
                  >
                    <ul
                      style={{
                        color: "#212529",
                        fontSize: 15,
                        margin: 0,
                        padding: 0,
                        listStyle: "disc inside",
                      }}
                    >
                      {p.details.map((d, k) => (
                        <li key={k}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
