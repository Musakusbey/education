import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function SifremiUnuttum() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(
        "Şifre sıfırlama e-postası gönderildi. Lütfen e-postanızı kontrol edin."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="giris-formu">
        <h2 className="text-2xl font-bold mb-6 text-center">Şifre Sıfırlama</h2>
        {error && <div className="text-red-600 mb-3 text-center">{error}</div>}
        {success && (
          <div className="text-green-600 mb-3 text-center">{success}</div>
        )}
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Gönderiliyor..." : "Şifre Sıfırlama Linki Gönder"}
        </button>
      </form>
    </div>
  );
}
