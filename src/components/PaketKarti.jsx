import React from "react";

export default function PaketKarti({
  baslik,
  aciklama,
  fiyat,
  link,
  detaylarClick,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start justify-between min-h-[280px] w-full max-w-xs mx-auto transition-transform hover:scale-105 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{baslik}</h3>
      <p className="text-gray-600 mb-4 flex-1">{aciklama}</p>
      <div className="w-full flex flex-col items-center mt-2">
        <span className="text-2xl font-extrabold text-green-600 mb-3">
          {fiyat} ₺
        </span>
        <div className="flex flex-row gap-3 w-full">
          <button
            className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl text-center transition-colors duration-200 shadow-md"
            onClick={detaylarClick}
            type="button"
          >
            Detaylar
          </button>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl text-center transition-colors duration-200 shadow-md flex items-center justify-center"
          >
            Satın Al
          </a>
        </div>
      </div>
    </div>
  );
}
