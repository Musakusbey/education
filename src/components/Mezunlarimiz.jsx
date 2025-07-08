import React from "react";
import "./Mezunlarimiz.css";

const mezunlar = [
  {
    isim: "Yusuf Karaca",
    unvan: "Jr. Front-End Developer",
    yorum: "Gerçek projelerle CV'mi güçlendirdim.",
    foto: "https://randomuser.me/api/portraits/men/65.jpg",
    sirket: "Trendyol",
  },
  {
    isim: "Sena Bulut",
    unvan: "Full-Stack Developer",
    yorum: "Mentor desteği iş başvurularında fark yarattı.",
    foto: "https://randomuser.me/api/portraits/women/49.jpg",
    sirket: "Arçelik",
  },
  {
    isim: "Mehmet Aydın",
    unvan: "Backend Developer",
    yorum: "Sıfırdan başlayıp 6 ayda işe girdim.",
    foto: "https://randomuser.me/api/portraits/men/23.jpg",
    sirket: "Aselsan",
  },
];

export default function Mezunlarimiz() {
  return (
    <section className="mezunlar-section">
      <h2 className="section-title">👨‍💻 Mezunlarımız Nerede Çalışıyor?</h2>
      <div className="mezunlar-grid">
        {mezunlar.map((m, i) => (
          <div className="mezun-kart" key={i}>
            <img src={m.foto} alt={m.isim} className="alumni-avatar" />
            <h4>{m.isim}</h4>
            <p className="unvan">{m.unvan}</p>
            <p className="text-sm text-gray-600 font-medium mt-2">{m.sirket}</p>
            <p className="yorum">"{m.yorum}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}
