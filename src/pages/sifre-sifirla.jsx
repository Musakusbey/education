import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";

const SifreSifirla = () => {
  const location = useLocation();
  const [yeniSifre, setYeniSifre] = useState("");
  const [mesaj, setMesaj] = useState("");

  // Hash üzerinden access_token alma
  let access_token = null;
  if (location.hash) {
    const hashParams = new URLSearchParams(location.hash.substring(1));
    access_token = hashParams.get("access_token");
  }

  const handleSifreGuncelle = async () => {
    const { data, error } = await supabase.auth.updateUser({
      password: yeniSifre,
    });

    if (error) {
      setMesaj("Hata: " + error.message);
    } else {
      setMesaj("✅ Şifren başarıyla güncellendi.");
    }
  };

  useEffect(() => {
    if (access_token) {
      // Otomatik olarak Supabase oturumu kurar
      supabase.auth.setSession({ access_token, refresh_token: access_token });
    }
  }, [access_token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Yeni Şifre Belirle</h2>
        <input
          type="password"
          placeholder="Yeni şifre"
          value={yeniSifre}
          onChange={e => setYeniSifre(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        <button
          onClick={handleSifreGuncelle}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Şifreyi Güncelle
        </button>
        {mesaj && <p className="mt-4 text-center">{mesaj}</p>}
      </div>
    </div>
  );
};

export default SifreSifirla;
