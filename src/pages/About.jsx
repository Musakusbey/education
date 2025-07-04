import Navbar from "../components/Navbar";

const mentors = [
  {
    icon: "👨‍💻",
    name: "Ahmet Yılmaz",
    role: "Frontend Mentor",
    exp: "15+ yıl deneyim",
    quote:
      "HTML, CSS ve React'te ustayım. Öğrencilerle birebir proje geliştirmeyi seviyorum.",
  },
  {
    icon: "👩‍💻",
    name: "Ayşe Demir",
    role: "Backend Uzmanı",
    exp: "18 yıl deneyim",
    quote: "Node.js ve API güvenliği üzerine gerçek örneklerle anlatıyorum.",
  },
  {
    icon: "🧑‍🔧",
    name: "Mehmet Koç",
    role: "Full-Stack Eğitmeni",
    exp: "20 yıl deneyim",
    quote: "Teoriyi değil, uygulamayı merkeze alarak anlatıyorum.",
  },
  {
    icon: "👩‍🔬",
    name: "Zeynep Aksoy",
    role: "DevOps ve CI/CD Danışmanı",
    exp: "12 yıl deneyim",
    quote: "Ekiplerin nasıl daha verimli çalışabileceğini öğretiyorum.",
  },
  {
    icon: "👨‍🏫",
    name: "Elif Yıldırım",
    role: "Mobil Uygulama Eğitmeni",
    exp: "10 yıl deneyim",
    quote:
      "React Native ve mobil tasarım prensiplerini canlı örneklerle anlatıyorum.",
  },
  {
    icon: "🗄️",
    name: "Burak Tanrıverdi",
    role: "Veri Tabanı ve Backend Mimarı",
    exp: "17 yıl deneyim",
    quote: "Veri yapılarında performans ve güvenlik odaklı eğitim veriyorum.",
  },
];

export default function About() {
  return (
    <>
      <Navbar />
      <section className="about-section hakkimizda-section">
        <div className="about-desc">
          <span className="about-badge">⭐️</span>
          <h2 className="about-title">Hakkımızda</h2>
          <p>
            <b>Frovexis</b>, Türkiye'de yazılım alanında kariyer yapmak isteyen
            bireyler için sıfırdan eğitim, mentorluk, proje ve staj destekli bir
            platformdur.
            <br />
            <br />
            Amacımız yalnızca eğitim vermek değil, katılımcılarımızı iş hayatına
            hazırlamak ve kariyer yolculuklarında rehberlik etmektir. Güçlü
            eğitmen kadromuz, güncel içeriklerimiz ve birebir mentorluk
            desteğimizle, yazılım sektöründe güvenle ilerlemenizi sağlıyoruz.
          </p>
          <div className="about-gradient-bar"></div>
        </div>
      </section>
      <section className="bizkimiz-section">
        <h2 className="bizkimiz-title">Biz Kimiz?</h2>
        <p className="bizkimiz-desc">
          Frovexis ekibi, 15 yılı aşkın süredir yazılım sektöründe deneyime
          sahip uzman eğitmenlerden oluşur. Her biri kendi alanında lider olan
          mentorlarımız, katılımcılara gerçek dünya projeleri, güncel
          teknolojiler ve birebir destek ile en etkili öğrenme deneyimini sunar.
        </p>
        <div className="mentor-grid">
          {mentors.map((m, i) => (
            <div className="mentor-card" key={i}>
              <div className="mentor-icon">{m.icon}</div>
              <div className="mentor-name">{m.name}</div>
              <div className="mentor-role">{m.role}</div>
              <div className="mentor-exp">{m.exp}</div>
              <div className="mentor-quote">“{m.quote}”</div>
            </div>
          ))}
        </div>
      </section>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">Frovexis</div>
          <div className="footer-info">© 2025 Tüm hakları saklıdır.</div>
          <div className="footer-info">
            KVKK & Gizlilik |{" "}
            <a
              href="mailto:info@frovexis.com"
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              info@frovexis.com
            </a>
          </div>
          <div className="footer-links">
            <a
              href="https://instagram.com/frovexis"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/company/frovexis"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://wa.me/905555555555"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
