import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Kayit() {
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [sifreTekrar, setSifreTekrar] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (sifre !== sifreTekrar) {
      setError("Şifreler eşleşmiyor.");
      return;
    }
    if (sifre.length < 6) {
      setError("Şifre en az 6 karakter olmalı.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password: sifre,
      options: {
        data: { ad, soyad },
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message || "Kayıt sırasında bir hata oluştu.");
    } else {
      setSuccess("Kayıt başarılı! Lütfen e-posta adresinizi onaylayın.");
      setTimeout(() => navigate("/giris"), 3500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="giris-formu">
        <h2 className="text-2xl font-bold mb-6 text-center">Kayıt Ol</h2>
        {error && <div className="text-red-600 mb-3 text-center">{error}</div>}
        {success && (
          <div className="text-green-600 mb-3 text-center">{success}</div>
        )}
        <input
          type="text"
          placeholder="Ad"
          value={ad}
          onChange={e => setAd(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Soyad"
          value={soyad}
          onChange={e => setSoyad(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifre (min 6 karakter)"
          value={sifre}
          onChange={e => setSifre(e.target.value)}
          minLength={6}
          required
        />
        <input
          type="password"
          placeholder="Şifre Tekrar"
          value={sifreTekrar}
          onChange={e => setSifreTekrar(e.target.value)}
          minLength={6}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Kaydediliyor..." : "Kayıt Ol"}
        </button>
      </form>
    </div>
  );
}
