import React, { useState, useEffect, useRef } from "react";
import { sorular } from "../data/sinavSorulari";
import { supabase } from "../supabaseClient";

export default function QuizAlani() {
  const [basladi, setBasladi] = useState(false);
  const [soruIndex, setSoruIndex] = useState(0);
  const [secili, setSecili] = useState(null);
  const [dogruSayisi, setDogruSayisi] = useState(0);
  const [bitti, setBitti] = useState(false);
  const [sure, setSure] = useState(20);
  const timerRef = useRef(null);
  const [cevapVerilmedi, setCevapVerilmedi] = useState(false);
  const [kullaniciCevaplari, setKullaniciCevaplari] = useState([]);

  const soru = sorular[soruIndex];

  useEffect(() => {
    if (!basladi || bitti) return;
    setSure(20);
    setCevapVerilmedi(false);
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSure(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCevapVerilmedi(true);
          setTimeout(() => handleSonraki(true), 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, [soruIndex, basladi]);

  useEffect(() => {
    if (bitti) {
      (async () => {
        const user = await supabase.auth.getUser();
        const user_id = user.data.user?.id;
        const quiz_title = "Temel Frontend Sınavı";
        const correct_count = dogruSayisi;
        const total_questions = sorular.length;
        const score = Math.round((dogruSayisi / sorular.length) * 100);
        if (user_id) {
          await supabase
            .from("quiz_results")
            .insert([
              { user_id, quiz_title, correct_count, total_questions, score },
            ]);
        }
      })();
    }
    // eslint-disable-next-line
  }, [bitti]);

  const handleSec = secenek => {
    setSecili(secenek);
  };

  const handleSonraki = (otomatik = false) => {
    clearInterval(timerRef.current);
    let yeniCevap = secili;
    if (otomatik && secili === null) yeniCevap = null;
    setKullaniciCevaplari(prev => [...prev, yeniCevap]);
    if (!otomatik && secili === soru.cevap) setDogruSayisi(dogruSayisi + 1);
    if (otomatik && secili === soru.cevap) setDogruSayisi(dogruSayisi + 1);
    setSecili(null);
    setCevapVerilmedi(false);
    if (soruIndex < sorular.length - 1) {
      setSoruIndex(soruIndex + 1);
    } else {
      setBitti(true);
    }
  };

  const handleRestart = () => {
    setSoruIndex(0);
    setSecili(null);
    setDogruSayisi(0);
    setBitti(false);
    setBasladi(false);
    setSure(20);
    setCevapVerilmedi(false);
    setKullaniciCevaplari([]);
    clearInterval(timerRef.current);
  };

  // Kart genişliği ve modern görünüm için stil
  const cardStyle = {
    width: "100%",
    maxWidth: "100%",
    margin: "0 0 32px 0",
    padding: "32px 40px",
    borderRadius: 20,
    boxShadow: "0 4px 24px rgba(30,60,120,0.08)",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: 320,
  };

  if (!basladi) {
    return (
      <div className="card" style={cardStyle}>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 800,
            marginBottom: 10,
            color: "#1e2236",
          }}
        >
          🧪 Sınav Alanı
        </h2>
        <p style={{ color: "#64748b", marginBottom: 32, fontSize: 18 }}>
          Yazılım becerilerinizi test etmek için kısa bir sınav sizi bekliyor.
        </p>
        <button
          className="btn-primary"
          style={{
            fontSize: 20,
            padding: "16px 48px",
            borderRadius: 10,
            background: "#2563eb",
          }}
          onClick={() => setBasladi(true)}
        >
          🟦 Sınava Başla
        </button>
      </div>
    );
  }

  if (bitti) {
    const yuzde = Math.round((dogruSayisi / sorular.length) * 100);
    let motivasyon = "";
    let showRetry = true;
    if (yuzde >= 60) {
      motivasyon =
        "Tebrikler, harika bir sonuç! Yazılım becerilerin gelişiyor, böyle devam! 🎉👏";
      showRetry = true;
    } else {
      motivasyon =
        "Henüz istediğin sonuca ulaşamadın ama bu sürecin bir parçası.\nEksiklerini fark etmek, gelişimin en önemli adımıdır.\nAşağıdaki Mentor Görüşmeleri bölümünden destek alarak birlikte bir gelişim planı oluşturabiliriz.\nUnutma: Her deneme seni daha da güçlendirir! 🚀";
      showRetry = false;
    }
    return (
      <div className="card" style={cardStyle}>
        <h2
          style={{
            fontSize: 26,
            fontWeight: 800,
            marginBottom: 10,
            color: "#1e2236",
          }}
        >
          🎉 Sınav Tamamlandı
        </h2>
        <div
          style={{
            maxHeight: 320,
            overflowY: "auto",
            width: "100%",
            margin: "0 auto 18px auto",
            background: "#f8fafc",
            borderRadius: 12,
            padding: 16,
            boxSizing: "border-box",
          }}
        >
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 10,
              color: "#2563eb",
            }}
          >
            Soru Çözümleri
          </h3>
          {sorular.map((s, i) => {
            const secilen = kullaniciCevaplari[i];
            const dogru = s.cevap;
            const dogruMu = secilen === dogru;
            return (
              <div
                key={i}
                style={{
                  marginBottom: 14,
                  padding: 10,
                  borderRadius: 8,
                  background: dogruMu ? "#e6fbe8" : "#fbeaea",
                  border: dogruMu
                    ? "1.5px solid #22c55e"
                    : "1.5px solid #ef4444",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{ fontWeight: 600, marginBottom: 4, color: "#222" }}
                >
                  Soru {i + 1}: {s.soru}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 15,
                  }}
                >
                  <span style={{ fontWeight: 500 }}>Senin Cevabın:</span>
                  <span
                    style={{
                      color: dogruMu ? "#22c55e" : "#ef4444",
                      fontWeight: 700,
                    }}
                  >
                    {secilen !== null && secilen !== undefined ? (
                      secilen
                    ) : (
                      <span style={{ color: "#ef4444" }}>Cevaplanmadı</span>
                    )}
                    {dogruMu ? " ✔️" : " ❌"}
                  </span>
                </div>
                {!dogruMu && (
                  <div style={{ fontSize: 15, marginTop: 2 }}>
                    <span style={{ fontWeight: 500 }}>Doğru Cevap:</span>{" "}
                    <span style={{ color: "#22c55e", fontWeight: 700 }}>
                      {dogru}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: 20, marginBottom: 10, color: "#2563eb" }}>
          Doğru Sayısı: <b>{dogruSayisi}</b> / {sorular.length}
        </p>
        <p style={{ fontSize: 20, marginBottom: 10, color: "#2563eb" }}>
          Başarı Yüzdesi: <b>%{yuzde}</b>
        </p>
        <div
          style={{
            margin: "18px 0 24px 0",
            fontSize: 18,
            color: yuzde >= 60 ? "#22c55e" : "#f59e42",
            fontWeight: 600,
            textAlign: "center",
            whiteSpace: "pre-line",
          }}
        >
          {motivasyon}
        </div>
        {showRetry && (
          <button
            onClick={handleRestart}
            className="btn-primary"
            style={{ fontSize: 18, padding: "12px 36px", borderRadius: 10 }}
          >
            Tekrar Dene
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="card" style={cardStyle}>
      <h2
        style={{
          fontSize: 24,
          fontWeight: 800,
          marginBottom: 8,
          color: "#1e2236",
          alignSelf: "flex-start",
        }}
      >
        🧪 Sınav Alanı
      </h2>
      <div
        style={{
          color: "#64748b",
          marginBottom: 10,
          fontSize: 16,
          alignSelf: "flex-start",
        }}
      >
        Soru {soruIndex + 1} / {sorular.length}
      </div>
      <div
        style={{
          fontWeight: 700,
          fontSize: 20,
          marginBottom: 20,
          color: "#222",
          alignSelf: "flex-start",
        }}
      >
        {soru.soru}
      </div>
      <div style={{ width: "100%", marginBottom: 18 }}>
        {soru.secenekler.map((secenek, i) => (
          <label
            key={i}
            style={{
              display: "block",
              marginBottom: 12,
              cursor: "pointer",
              fontSize: 17,
              background: secili === secenek ? "#e3edfa" : "#f8fafc",
              border:
                secili === secenek ? "2px solid #2563eb" : "1px solid #d1d5db",
              borderRadius: 8,
              padding: "10px 16px",
              transition: "all 0.2s",
            }}
          >
            <input
              type="radio"
              name="secenek"
              value={secenek}
              checked={secili === secenek}
              onChange={() => handleSec(secenek)}
              style={{ marginRight: 12 }}
            />
            {secenek}
          </label>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginTop: 18,
        }}
      >
        <span style={{ color: "#2563eb", fontWeight: 700, fontSize: 18 }}>
          ⏳ {sure} sn
        </span>
        <button
          className="btn-submit"
          onClick={() => handleSonraki(false)}
          disabled={secili === null || cevapVerilmedi}
          style={{ fontSize: 18, padding: "12px 36px", borderRadius: 10 }}
        >
          {soruIndex === sorular.length - 1 ? "Testi Bitir" : "Sonraki Soru"}
        </button>
      </div>
      {cevapVerilmedi && (
        <div
          style={{
            color: "#ef4444",
            marginTop: 16,
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          Süre doldu, sonraki soruya geçiliyor...
        </div>
      )}
    </div>
  );
}
