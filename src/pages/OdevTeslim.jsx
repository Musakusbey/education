import { useState } from "react";

export default function OdevTeslim() {
  const [ad, setAd] = useState("");
  const [email, setEmail] = useState("");
  const [baslik, setBaslik] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [dosya, setDosya] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("ad", ad);
    formData.append("email", email);
    formData.append("baslik", baslik);
    formData.append("aciklama", aciklama);
    formData.append("dosya", dosya);
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      await fetch(`${API_URL}/api/odev-gonder`, {
        method: "POST",
        body: formData,
      });
      setSuccess(true);
    } catch {
      alert("Gönderim sırasında hata oluştu.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-2">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        {success ? (
          <div className="text-green-600 text-center text-lg font-semibold py-8">
            ✅ Ödeviniz başarıyla iletildi.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">
              📤 Ödev Teslim Formu
            </h2>
            <input
              type="text"
              placeholder="Ad Soyad"
              className="w-full p-2 mb-3 border rounded"
              onChange={e => setAd(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="E-posta adresi"
              className="w-full p-2 mb-3 border rounded"
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Ödev Başlığı"
              className="w-full p-2 mb-3 border rounded"
              onChange={e => setBaslik(e.target.value)}
              required
            />
            <textarea
              placeholder="Açıklama"
              className="w-full p-2 mb-3 border rounded"
              rows={3}
              onChange={e => setAciklama(e.target.value)}
              required
            />
            <input
              type="file"
              accept=".pdf,.zip,.png,.jpg,.jpeg"
              className="w-full p-2 mb-4"
              onChange={e => setDosya(e.target.files[0])}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Gönderiliyor..." : "Gönder"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
