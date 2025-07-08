import React, { useState } from "react";
import "./FAQSection.css";

const faqData = [
  {
    question: "Eğitimler canlı mı yoksa video şeklinde mi?",
    answer:
      "Tüm eğitimler canlı Zoom üzerinden gerçekleşir. Kaçıranlar için video kaydı paylaşılır.",
  },
  {
    question: "Programlar ne kadar sürüyor?",
    answer:
      "Her paket toplamda 6 ay sürmektedir. Haftalık canlı ders ve uygulamalar içerir.",
  },
  {
    question: "Eğitim sonunda iş garantisi var mı?",
    answer:
      "İş garantisi yoktur, ancak 80+ kurumsal partnerle işe/staja erişim sağlanır.",
  },
  {
    question: "Eğitim ücreti dışında ek bir masraf olacak mı?",
    answer:
      "Hayır, tüm kaynaklar ve platformlar eğitime dahildir. Ek ücret talep edilmez.",
  },
  {
    question: "Mentorluk desteği ne şekilde oluyor?",
    answer:
      "Her öğrenciye özel mentor atanır. Haftalık 1-1 görüşmeler yapılır. Ek olarak Discord üzerinden yazılı destek sağlanır.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-container">
      <h2 className="faq-title">Sıkça Sorulan Sorular</h2>
      {faqData.map((item, idx) => (
        <div
          className={`faq-item${openIndex === idx ? " open" : ""}`}
          key={idx}
        >
          <button className="faq-question" onClick={() => toggleIndex(idx)}>
            {idx + 1}. {item.question}
          </button>
          <div className="faq-answer">{item.answer}</div>
        </div>
      ))}
    </section>
  );
};

export default FAQSection;
