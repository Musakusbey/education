import React from "react";

export default function ImpactStats() {
  return (
    <section className="impact-stats-section">
      <h2 className="impact-stats-title">
        Frovexis ile Yazılımda Etki Yaratanlar!
      </h2>
      <div className="impact-stats-grid">
        <div className="impact-card">
          <div className="impact-card-title">1.200+ Katılımcı</div>
          <div className="impact-card-desc">
            Online eğitimlerimize katılan 1200'den fazla öğrenci yazılım
            yolculuğuna başladı.
          </div>
        </div>
        <div className="impact-card">
          <div className="impact-card-title">%85 Kariyer Geçiş Başarısı</div>
          <div className="impact-card-desc">
            Mezunlarımızın %85'i yazılım alanında işe yerleşti ya da staj imkanı
            yakaladı.
          </div>
        </div>
        <div className="impact-card">
          <div className="impact-card-title">80+ Şirketle İş Birliği</div>
          <div className="impact-card-desc">
            Frovexis mezunları 80'den fazla teknoloji şirketi ile buluştu.
          </div>
        </div>
      </div>
      <style>{`
        .impact-stats-section {
          background: #f9fafb;
          padding: 56px 0 48px 0;
          width: 100%;
        }
        .impact-stats-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 800;
          color: #1a2236;
          margin-bottom: 40px;
        }
        .impact-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 16px;
        }
        .impact-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 18px rgba(30,60,120,0.07);
          padding: 32px 24px 28px 24px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: box-shadow 0.18s, transform 0.18s;
        }
        .impact-card:hover {
          box-shadow: 0 10px 32px rgba(30,60,120,0.13);
          transform: scale(1.035);
        }
        .impact-card-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #212529;
          margin-bottom: 12px;
        }
        .impact-card-desc {
          font-size: 1.08rem;
          color: #5a6473;
          font-weight: 400;
          line-height: 1.6;
        }
        @media (max-width: 900px) {
          .impact-stats-grid {
            grid-template-columns: 1fr;
            gap: 18px;
            padding: 0 4vw;
          }
          .impact-card {
            padding: 24px 12px 18px 12px;
          }
          .impact-stats-title {
            font-size: 1.3rem;
            margin-bottom: 24px;
          }
        }
      `}</style>
    </section>
  );
}
