import React from "react";

export default function Tesekkur() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white py-16">
      <div className="bg-[#fff7e0] rounded-2xl shadow-lg px-8 py-10 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-[#ff9800] mb-4">Teşekkürler!</h1>
        <p className="text-lg text-[#204080] mb-2 font-medium">
          Başvurunuz başarıyla alındı.
        </p>
        <p className="text-base text-gray-700 mb-4">
          En kısa sürede sizinle iletişime geçeceğiz.
        </p>
        <a
          href="/"
          className="inline-block mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-semibold shadow hover:scale-105 transition"
        >
          Ana Sayfaya Dön
        </a>
      </div>
    </div>
  );
}
