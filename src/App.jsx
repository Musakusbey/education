import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import About from "./pages/About";
import Apply from "./pages/Apply";
import Tesekkur from "./pages/tesekkur";
import OdevTeslim from "./pages/OdevTeslim";
import Kampus from "./pages/Ogrenciler";
import Giris from "./pages/Giris";
import Kayit from "./pages/Kayit";
import SifremiUnuttum from "./pages/SifremiUnuttum";
import SifreSifirla from "./pages/sifre-sifirla";
import ResetPassword from "./pages/ResetPassword";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const currentSession = supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return null;
  return session ? children : <Navigate to="/giris" />;
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programlar" element={<Programs />} />
          <Route path="/hakkimizda" element={<About />} />
          <Route path="/basvuru" element={<Apply />} />
          <Route path="/tesekkur" element={<Tesekkur />} />
          <Route path="/odev-teslim" element={<OdevTeslim />} />
          <Route path="/giris" element={<Giris />} />
          <Route path="/kayit" element={<Kayit />} />
          <Route path="/sifremi-unuttum" element={<SifremiUnuttum />} />
          <Route path="/sifre-sifirla" element={<SifreSifirla />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/kampus"
            element={
              <PrivateRoute>
                <Kampus />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
