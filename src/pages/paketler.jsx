import React from "react";
import PaketKarti from "../components/PaketKarti";

const paketler = [
  {
    baslik: "Başlangıç Paketi",
    aciklama:
      "Sıfırdan yazılıma giriş, temel HTML, CSS ve JavaScript. Mentorluk ve mini projelerle destekli.",
    fiyat: "6750",
    link: "https://www.shopier.com/123456?paket=baslangic",
  },
  {
    baslik: "Orta Seviye Paketi",
    aciklama:
      "React, Node.js, MongoDB ve ileri seviye uygulamalı eğitim. Gerçek projeler ve birebir mentorluk.",
    fiyat: "9600",
    link: "https://www.shopier.com/123456?paket=orta",
  },
  {
    baslik: "İleri Seviye Paketi",
    aciklama:
      "Full-stack eğitim, büyük proje geliştirme, CV & mülakat desteği, referans mektubu ve daha fazlası.",
    fiyat: "14400",
    link: "https://www.shopier.com/123456?paket=ileri",
  },
];

export default function Paketler() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10">
        Yazılım Eğitim Paketleri
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {paketler.map((paket, i) => (
          <PaketKarti key={i} {...paket} />
        ))}
      </div>
    </div>
  );
}
