import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Giris.css";

export default function Giris() {
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: sifre,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate("/kampus");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="giris-formu">
        <h2 className="text-2xl font-bold mb-6 text-center">Kampüs Girişi</h2>
        {error && <div className="text-red-600 mb-3 text-center">{error}</div>}
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={sifre}
          onChange={e => setSifre(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>
        <div style={{ marginTop: 12, textAlign: "center" }}>
          <Link
            to="/sifremi-unuttum"
            style={{
              color: "#1e88e5",
              textDecoration: "underline",
              marginRight: 8,
            }}
          >
            Şifremi unuttum
          </Link>
          <span> | </span>
          <Link
            to="/kayit"
            style={{
              color: "#1e88e5",
              textDecoration: "underline",
              marginLeft: 8,
            }}
          >
            Kayıt Ol
          </Link>
        </div>
      </form>
    </div>
  );
}
