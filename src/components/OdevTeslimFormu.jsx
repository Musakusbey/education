import { useState } from "react";

function OdevTeslimFormu() {
  const [isim, setIsim] = useState("");
  const [email, setEmail] = useState("");
  const [dosya, setDosya] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("isim", isim);
    formData.append("email", email);
    formData.append("dosya", dosya);

    const API_URL = import.meta.env.VITE_API_URL;
    await fetch(`${API_URL}/api/odev-gonder`, {
      method: "POST",
      body: formData,
    });

    alert("Ödev başarıyla gönderildi!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-md w-full max-w-md mx-auto mt-8 bg-white shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">📤 Ödev Teslim Et</h2>
      <input
        type="text"
        placeholder="İsminiz"
        className="w-full p-2 mb-2 border"
        onChange={e => setIsim(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="E-posta"
        className="w-full p-2 mb-2 border"
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="file"
        className="w-full p-2 mb-4"
        onChange={e => setDosya(e.target.files[0])}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Gönder
      </button>
    </form>
  );
}

export default OdevTeslimFormu;
