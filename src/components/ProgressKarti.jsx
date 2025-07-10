import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function ProgressKarti() {
  const [attendancePct, setAttendancePct] = useState(0);
  const [homeworkCount, setHomeworkCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const user = await supabase.auth.getUser();
        const user_id = user.data.user?.id;
        if (!user_id) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }
        // Aktiflik
        const now = new Date();
        const monthStr = `${now.getFullYear()}-${String(
          now.getMonth() + 1
        ).padStart(2, "0")}`;
        const { data: attendanceData, error: attErr } = await supabase
          .from("lesson_attendance")
          .select("date, attended, watched_recording")
          .eq("user_id", user_id)
          .gte("date", `${monthStr}-01`)
          .lte("date", `${monthStr}-31`);
        if (attErr) throw attErr;
        const totalLessons = attendanceData.length;
        const attendedCount = attendanceData.filter(
          a => a.attended || a.watched_recording
        ).length;
        const pct =
          totalLessons > 0
            ? Math.round((attendedCount / totalLessons) * 100)
            : 0;
        setAttendancePct(pct);
        // Ödev
        const { data: hwData, error: hwErr } = await supabase
          .from("homework_submissions")
          .select("id")
          .eq("user_id", user_id)
          .gte("created_at", `${monthStr}-01`)
          .lte("created_at", `${monthStr}-31`);
        if (hwErr) throw hwErr;
        setHomeworkCount(hwData.length);
        // Proje
        const { data: prjData, error: prjErr } = await supabase
          .from("project_submissions")
          .select("id")
          .eq("user_id", user_id)
          .gte("created_at", `${monthStr}-01`)
          .lte("created_at", `${monthStr}-31`);
        if (prjErr) throw prjErr;
        setProjectCount(prjData.length);
        // Genel puan
        setScore(hwData.length * 10 + prjData.length * 20);
      } catch (err) {
        setError("Error: " + (err.message || err));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="progress-card">
      <style>{`
        .progress-card {
          background-color: #f9fafb;
          border: 2px solid #e5e7eb;
          border-radius: 1rem;
          padding: 1.5rem 2rem;
          width: 100%;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
          margin-top: 2rem;
        }
        .progress-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #111827;
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }
        .progress-grid {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .progress-item {
          flex: 1;
          min-width: 160px;
          background-color: white;
          border: 1px solid #d1d5db;
          border-radius: 0.75rem;
          padding: 2.2rem 1.5rem 1.7rem 1.5rem;
          text-align: center;
          box-shadow: 0 2px 8px rgba(99,102,241,0.07);
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.22s cubic-bezier(.4,2,.6,1), box-shadow 0.22s cubic-bezier(.4,2,.6,1);
        }
        .progress-item:hover {
          transform: scale(1.07) translateY(-6px);
          box-shadow: 0 12px 32px rgba(99,102,241,0.18);
          z-index: 2;
        }
        .progress-label {
          font-size: 1.1rem;
          color: #6b7280;
          font-weight: 600;
          margin-bottom: 0.7rem;
        }
        .progress-value {
          font-size: 2.3rem;
          font-weight: 800;
          color: #2563eb;
          margin-bottom: 0.3rem;
        }
        .progress-value.orange { color: #f59e42; }
        .progress-value.teal { color: #14b8a6; }
        .progress-value.blue { color: #6366f1; }
        .progress-value.yellow { color: #eab308; }
        .progress-subtext {
          font-size: 1rem;
          color: #9ca3af;
        }
        .progress-bar-bg {
          width: 100%;
          height: 18px;
          background: #e0e7ef;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 0.7rem;
        }
        .progress-bar {
          height: 100%;
          border-radius: 10px;
          transition: width 0.5s;
        }
        .progress-bar.green { background: linear-gradient(90deg, #22d3ee, #22c55e); }
        .progress-bar.yellow { background: linear-gradient(90deg, #fde68a, #facc15); }
        .progress-bar.red { background: linear-gradient(90deg, #fca5a5, #ef4444); }
      `}</style>
      <h2 className="progress-title">
        <span role="img" aria-label="bar">
          📊
        </span>{" "}
        Puan & İlerleme
      </h2>
      {loading ? (
        <div style={{ color: "#64748b", fontSize: 18 }}>Yükleniyor...</div>
      ) : error ? (
        <div style={{ color: "#ef4444", fontSize: 18 }}>{error}</div>
      ) : (
        <div className="progress-grid">
          {/* Aktiflik */}
          <div className="progress-item">
            <span className="progress-label">Aktiflik</span>
            <div className="progress-bar-bg">
              <div
                className={`progress-bar ${
                  attendancePct >= 80
                    ? "green"
                    : attendancePct >= 60
                    ? "yellow"
                    : "red"
                }`}
                style={{ width: `${attendancePct}%` }}
              ></div>
            </div>
            <span className="progress-value yellow">%{attendancePct}</span>
            <span className="progress-subtext">Bu ay</span>
          </div>
          {/* Ödev */}
          <div className="progress-item">
            <span className="progress-label">Ödev</span>
            <span className="progress-value blue">{homeworkCount}</span>
            <span className="progress-subtext">teslim</span>
          </div>
          {/* Proje */}
          <div className="progress-item">
            <span className="progress-label">Proje</span>
            <span className="progress-value teal">{projectCount}</span>
            <span className="progress-subtext">teslim</span>
          </div>
          {/* Genel Puan */}
          <div className="progress-item">
            <span className="progress-label">Genel Puan</span>
            <span className="progress-value orange">{score}</span>
            <span className="progress-subtext">puan</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgressKarti;
