import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });
    if (error) setMessage("Hata: " + error.message);
    else setMessage("Şifre başarıyla güncellendi!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-4">Yeni Şifre Belirle</h2>
        <input
          type="password"
          placeholder="Yeni şifre"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Şifreyi Güncelle
        </button>
        {message && <p className="mt-3 text-sm text-center">{message}</p>}
      </div>
    </div>
  );
}
