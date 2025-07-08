import React from "react";
import styles from "./Steps.module.css";

const steps = [
  {
    emoji: "📝",
    title: "Başvuru ve Mini Test",
    desc: "Kısa bir quiz ile seviyen belirlenir ve uygun programa yönlendirilirsin.",
  },
  {
    emoji: "🎯",
    title: "Eğitim Süreci Başlar",
    desc: "Canlı dersler, ödevler ve projelerle uygulamalı öğrenirsin.",
  },
  {
    emoji: "🤝",
    title: "Mentor Desteği",
    desc: "Süreç boyunca birebir destek alır, mentorlara sorular sorabilirsin.",
  },
  {
    emoji: "💼",
    title: "Proje ve CV Hazırlığı",
    desc: "Portföyünü oluşturur, CV ve mülakat desteği alırsın.",
  },
  {
    emoji: "🚀",
    title: "Kariyere Geçiş",
    desc: "Staj, referans mektubu ve iş başvurularıyla kariyer yolculuğun başlar.",
  },
  {
    emoji: "🛠",
    title: "Projeler",
    desc: "Gerçek dünya projeleri yaparsın, portföyünü güçlendirirsin.",
  },
  {
    emoji: "🎓",
    title: "Değerlendirme",
    desc: "Proje ve quizlerle gelişimini ölçersin.",
  },
  {
    emoji: "📨",
    title: "Sertifika & Destek",
    desc: "Sertifika alır, mezun desteğinden yararlanırsın.",
  },
];

export default function Steps() {
  return (
    <section className={styles.stepsSection}>
      <h2 className={styles.stepsTitle}>Eğitim Süreci Nasıl İşliyor?</h2>
      <div className={styles.stepsContainer}>
        {steps.map((step, index) => (
          <div className={styles.stepCard} key={index}>
            <div className={styles.stepEmoji}>{step.emoji}</div>
            <h3>
              {index + 1}. {step.title}
            </h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
