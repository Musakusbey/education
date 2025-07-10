import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";

const quizData = [
  {
    question: "Yazılımda seviyen nedir?",
    options: [
      { text: "Hiç başlamadım", score: "beginner" },
      { text: "Temel bilgim var", score: "intermediate" },
      { text: "Proje geliştirdim / çalışıyorum", score: "advanced" },
    ],
  },
  {
    question: "Hedefin nedir?",
    options: [
      { text: "Temel öğrenmek", score: "beginner" },
      { text: "Gerçek projeler yapmak", score: "intermediate" },
      { text: "Kariyer / iş değişimi", score: "advanced" },
    ],
  },
  {
    question: "Hangi alan ilgini çekiyor?",
    options: [
      { text: "Frontend", score: "beginner" },
      { text: "Backend", score: "intermediate" },
      { text: "Full-Stack", score: "advanced" },
      { text: "Mobil", score: "intermediate" },
    ],
  },
];

const quizResults = {
  beginner: {
    title: "Başlangıç Programı",
    description:
      "Sıfırdan başlamak isteyenler için temel ve uygulamalı bir yolculuk.",
  },
  intermediate: {
    title: "Orta Seviye Programı",
    description: "Gerçek projelerle öğrenmeye hazırsan bu paket tam sana göre.",
  },
  advanced: {
    title: "İleri Seviye Programı",
    description:
      "Kariyer hedefin varsa, ileri düzey projeler ve mentorluk seni bekliyor.",
  },
};

function QuizComponent({ onFinish, scrollToForm, setRecommended }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleOption = score => {
    const newAnswers = [...answers, score];
    if (step < quizData.length - 1) {
      setAnswers(newAnswers);
      setStep(step + 1);
    } else {
      // Hesapla
      const counts = { beginner: 0, intermediate: 0, advanced: 0 };
      newAnswers.forEach(s => {
        counts[s] += 1;
      });
      const maxScore = Object.keys(counts).reduce((a, b) =>
        counts[a] >= counts[b] ? a : b
      );
      setResult(maxScore);
      setAnswers(newAnswers);
      if (setRecommended) setRecommended(maxScore);
      // onFinish burada çağrılmayacak, butona tıklanınca çağrılacak
    }
  };

  if (result && !showForm) {
    const res = quizResults[result];
    return (
      <div className="quiz-result-box">
        <h2>
          Senin için en uygun program:{" "}
          <span style={{ color: "#007bff" }}>{res.title}</span>
        </h2>
        <p style={{ marginBottom: 16 }}>{res.description}</p>
        <button
          className="quiz-cta-btn"
          onClick={() => {
            setShowForm(true);
            if (scrollToForm) scrollToForm(result);
            if (onFinish) onFinish(result);
          }}
        >
          Bu programa başvur
        </button>
      </div>
    );
  }
  if (result && showForm) {
    // Form açılacak, QuizComponent gizlenecek (Apply.jsx'te quizDone true olacak)
    return null;
  }

  const q = quizData[step];
  return (
    <div className="quiz-box">
      <h2 className="quiz-q">{q.question}</h2>
      <div className="quiz-options">
        {q.options.map((opt, i) => (
          <button
            key={i}
            className="quiz-option-btn"
            onClick={() => handleOption(opt.score)}
          >
            {opt.text}
          </button>
        ))}
      </div>
      <div className="quiz-progress">
        {step + 1} / {quizData.length}
      </div>
    </div>
  );
}

export default function Apply() {
  const [form, setForm] = useState({
    ad: "",
    soyad: "",
    email: "",
    telefon: "",
    alan: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quizDone, setQuizDone] = useState(false);
  const [, setRecommended] = useState(null);
  const formRef = useRef(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const apiUrl =
        window.location.hostname === "localhost"
          ? "http://localhost:5000/api/contact"
          : "/api/contact";
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    } catch {
      setError("Bağlantı hatası, lütfen tekrar deneyin.");
    }
    setLoading(false);
  };

  const scrollToForm = result => {
    // Quiz tamamlandığında önerilen programı alan olarak ata
    let alan = "";
    if (result === "beginner") alan = "Frontend";
    else if (result === "intermediate") alan = "Backend";
    else if (result === "advanced") alan = "Full-Stack";
    setForm(f => ({ ...f, alan }));
    setQuizDone(true);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <Navbar />
      <div
        className="apply-bg-animated"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 8px",
          flexDirection: "column",
        }}
      >
        {!quizDone && (
          <QuizComponent
            onFinish={() => setQuizDone(true)}
            scrollToForm={scrollToForm}
            setRecommended={setRecommended}
          />
        )}
        <form
          className="form-container"
          onSubmit={handleSubmit}
          ref={formRef}
          style={{ display: quizDone ? "flex" : "none" }}
        >
          <h1>Başvuru Formu</h1>
          {!submitted ? (
            <>
              <input
                type="text"
                name="ad"
                placeholder="Ad"
                required
                value={form.ad}
                onChange={handleChange}
              />
              <input
                type="text"
                name="soyad"
                placeholder="Soyad"
                required
                value={form.soyad}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="E-posta"
                required
                value={form.email}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="telefon"
                placeholder="Telefon"
                required
                value={form.telefon}
                onChange={handleChange}
              />
              <select
                name="alan"
                required
                value={form.alan}
                onChange={handleChange}
              >
                <option value="">İlgi Alanı Seçin</option>
                <option value="Frontend">
                  Frontend (Başlangıç için önerilir)
                </option>
                <option value="Backend">
                  Backend (Orta Seviye için önerilir)
                </option>
                <option value="Full-Stack">
                  Full-Stack (İleri Seviye için önerilir)
                </option>
                <option value="Mobil">Mobil</option>
              </select>
              <button type="submit" disabled={loading}>
                {loading ? "Gönderiliyor..." : "Hemen Başvur"}
              </button>
              {error && (
                <div style={{ color: "red", marginTop: 8 }}>{error}</div>
              )}
            </>
          ) : (
            <div
              className="info-text"
              style={{
                fontSize: "1.1rem",
                color: "#204080",
                margin: "32px 0",
                textAlign: "center",
              }}
            >
              Başvurunuz alındı. En kısa sürede sizinle iletişime geçeceğiz.
            </div>
          )}
        </form>
        <style>{`
          .apply-bg-animated {
            background: #fff;
            overflow-x: hidden;
            width: 100vw;
            box-sizing: border-box;
          }
          .form-container {
            max-width: 600px;
            width: 100%;
            margin: 0 auto;
            background: white;
            padding: 32px;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.08);
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
          }
          .form-container h1 {
            text-align: center;
            color: #1c2a4d;
            margin-bottom: 24px;
            font-family: 'Inter', sans-serif;
            font-size: 2rem;
            font-weight: 700;
          }
          .form-container input,
          .form-container select {
            width: 100%;
            height: 48px;
            padding: 0 12px;
            margin-bottom: 16px;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 1rem;
            font-family: 'Inter', sans-serif;
            background: #f9fafc;
            transition: border 0.2s;
            box-sizing: border-box;
          }
          .form-container input:focus,
          .form-container select:focus {
            border: 1.5px solid #FFA726;
            outline: none;
          }
          .form-container button {
            width: 100%;
            height: 48px;
            background: linear-gradient(to right, #FFA726, #FB8C00);
            border: none;
            color: white;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1.08rem;
            font-family: 'Inter', sans-serif;
            transition: 0.2s;
            margin-top: 8px;
            box-shadow: 0 2px 8px rgba(251,140,0,0.08);
            box-sizing: border-box;
          }
          .form-container button:hover {
            background: linear-gradient(to right, #FB8C00, #EF6C00);
          }
          .form-container .info-text {
            margin-top: 16px;
            text-align: center;
            font-size: 0.97rem;
            color: #333;
            opacity: 0.85;
          }
          @media (max-width: 700px) {
            .apply-bg-animated {
              padding: 8px 4px;
              min-height: 100vh;
              width: 100vw;
              overflow-x: hidden;
            }
            .form-container {
              padding: 16px 12px;
              border-radius: 12px;
              margin: 0 4px;
              width: calc(100% - 8px);
              max-width: none;
            }
            .form-container h1 {
              font-size: 1.4rem;
              margin-bottom: 16px;
            }
            .form-container input,
            .form-container select {
              height: 44px;
              padding: 0 10px;
              margin-bottom: 12px;
              font-size: 0.95rem;
            }
            .form-container button {
              height: 44px;
              font-size: 1rem;
              margin-top: 4px;
              width: 100%;
              display: block;
            }
            .form-container .info-text {
              font-size: 0.9rem;
              margin: 24px 0;
            }
            html, body, #root {
              overflow-x: hidden !important;
              width: 100vw;
              box-sizing: border-box;
            }
          }
          .quiz-box, .quiz-result-box {
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.08);
            padding: 32px 24px 24px 24px;
            max-width: 480px;
            width: 100%;
            margin: 0 auto 32px auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-sizing: border-box;
          }
          .quiz-q {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1c2a4d;
            margin-bottom: 18px;
            text-align: center;
          }
          .quiz-options {
            display: flex;
            flex-direction: column;
            gap: 14px;
            width: 100%;
          }
          .quiz-option-btn {
            background: #f5f9ff;
            border: 1.5px solid #007bff;
            color: #1c2a4d;
            border-radius: 8px;
            padding: 12px 0;
            font-size: 1.08rem;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.15s, color 0.15s;
            width: 100%;
          }
          .quiz-option-btn:hover {
            background: #007bff;
            color: #fff;
          }
          .quiz-progress {
            margin-top: 18px;
            font-size: 0.98rem;
            color: #888;
          }
          .quiz-result-box h2 {
            font-size: 1.3rem;
            font-weight: 700;
            color: #1c2a4d;
            margin-bottom: 10px;
            text-align: center;
          }
          .quiz-cta-btn {
            background: linear-gradient(to right, #FFA726, #FB8C00);
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 12px 32px;
            font-size: 1.08rem;
            font-weight: 600;
            margin-top: 12px;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(251,140,0,0.08);
            transition: 0.2s;
          }
          .quiz-cta-btn:hover {
            background: linear-gradient(to right, #FB8C00, #EF6C00);
          }
        `}</style>
      </div>
    </>
  );
}
