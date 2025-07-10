import { useState } from "react";

export default function OdevVeProjeTeslim() {
  // Ödev Teslimi State
  const [odev, setOdev] = useState({
    ad: "",
    email: "",
    baslik: "",
    aciklama: "",
    dosya: null,
  });
  const [odevSuccess, setOdevSuccess] = useState(false);
  const [odevLoading, setOdevLoading] = useState(false);
  const [odevError, setOdevError] = useState("");

  // Proje Teslimi State
  const [proje, setProje] = useState({
    ad: "",
    email: "",
    baslik: "",
    aciklama: "",
    dosya: null,
  });
  const [projeSuccess, setProjeSuccess] = useState(false);
  const [projeLoading, setProjeLoading] = useState(false);
  const [projeError, setProjeError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // Ödev Teslimi Gönder
  const handleOdevSubmit = async e => {
    e.preventDefault();
    setOdevLoading(true);
    setOdevError("");
    const formData = new FormData();
    Object.entries(odev).forEach(([key, val]) => formData.append(key, val));
    try {
      const res = await fetch(`${API_URL}/api/odev-gonder`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) setOdevSuccess(true);
      else setOdevError("Bir hata oluştu, lütfen tekrar deneyin.");
    } catch {
      setOdevError("Bağlantı hatası, lütfen tekrar deneyin.");
    }
    setOdevLoading(false);
  };

  // Proje Teslimi Gönder
  const handleProjeSubmit = async e => {
    e.preventDefault();
    setProjeLoading(true);
    setProjeError("");
    const formData = new FormData();
    Object.entries(proje).forEach(([key, val]) => formData.append(key, val));
    try {
      const res = await fetch(`${API_URL}/api/proje-gonder`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) setProjeSuccess(true);
      else setProjeError("Bir hata oluştu, lütfen tekrar deneyin.");
    } catch {
      setProjeError("Bağlantı hatası, lütfen tekrar deneyin.");
    }
    setProjeLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-2 gap-12">
      {/* Ödev Teslim Formu */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-left text-blue-800">
          🟦 Ödev Teslim Formu
        </h2>
        {odevSuccess ? (
          <div className="text-green-600 text-center text-lg font-semibold py-8">
            ✅ Ödeviniz başarıyla iletildi.
          </div>
        ) : (
          <form onSubmit={handleOdevSubmit} className="flex flex-col gap-3">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Ad Soyad"
                className="flex-1 p-2 border rounded"
                required
                onChange={e => setOdev(o => ({ ...o, ad: e.target.value }))}
              />
              <input
                type="email"
                placeholder="E-posta adresi"
                className="flex-1 p-2 border rounded"
                required
                onChange={e => setOdev(o => ({ ...o, email: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Ödev Başlığı"
                className="flex-1 p-2 border rounded"
                required
                onChange={e => setOdev(o => ({ ...o, baslik: e.target.value }))}
              />
            </div>
            <textarea
              placeholder="Açıklama"
              className="w-full p-2 border rounded"
              rows={3}
              required
              onChange={e => setOdev(o => ({ ...o, aciklama: e.target.value }))}
            />
            <div className="flex items-center gap-4">
              <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition">
                Dosya Seç
                <input
                  type="file"
                  accept=".pdf,.zip,.png,.jpg,.jpeg"
                  className="hidden"
                  required
                  onChange={e =>
                    setOdev(o => ({ ...o, dosya: e.target.files[0] }))
                  }
                />
              </label>
              <span className="text-gray-500">
                {odev.dosya ? odev.dosya.name : "Dosya seçilmedi"}
              </span>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded font-bold mt-2"
              disabled={odevLoading}
            >
              {odevLoading ? "Gönderiliyor..." : "Gönder"}
            </button>
            {odevError && <div className="text-red-600 mt-2">{odevError}</div>}
            <div className="text-xs text-gray-500 mt-1">
              📌 Lütfen yalnızca bir gönderim yapınız. Gönderim sonrası
              değişiklik yapılamaz.
            </div>
          </form>
        )}
      </div>
      {/* Proje Teslim Formu */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-left text-red-700">
          🟥 Proje Teslimi
        </h2>
        {projeSuccess ? (
          <div className="text-green-600 text-center text-lg font-semibold py-8">
            ✅ Projeniz başarıyla iletildi.
          </div>
        ) : (
          <form onSubmit={handleProjeSubmit} className="flex flex-col gap-3">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Ad Soyad"
                className="flex-1 p-2 border rounded"
                required
                onChange={e => setProje(p => ({ ...p, ad: e.target.value }))}
              />
              <input
                type="email"
                placeholder="E-posta"
                className="flex-1 p-2 border rounded"
                required
                onChange={e => setProje(p => ({ ...p, email: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Proje Başlığı"
                className="flex-1 p-2 border rounded"
                required
                onChange={e =>
                  setProje(p => ({ ...p, baslik: e.target.value }))
                }
              />
            </div>
            <textarea
              placeholder="Açıklama"
              className="w-full p-2 border rounded"
              rows={3}
              required
              onChange={e =>
                setProje(p => ({ ...p, aciklama: e.target.value }))
              }
            />
            <div className="flex items-center gap-4">
              <label className="bg-purple-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-purple-700 transition">
                Dosya Seç
                <input
                  type="file"
                  accept=".pdf,.zip,.png,.jpg,.jpeg"
                  className="hidden"
                  required
                  onChange={e =>
                    setProje(p => ({ ...p, dosya: e.target.files[0] }))
                  }
                />
              </label>
              <span className="text-gray-500">
                {proje.dosya ? proje.dosya.name : "Dosya seçilmedi"}
              </span>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded font-bold mt-2"
              disabled={projeLoading}
            >
              {projeLoading ? "Gönderiliyor..." : "Gönder"}
            </button>
            {projeError && (
              <div className="text-red-600 mt-2">{projeError}</div>
            )}
            <div className="text-xs text-gray-500 mt-1">
              📌 Lütfen yalnızca bir gönderim yapınız. Gönderim sonrası
              değişiklik yapılamaz.
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
