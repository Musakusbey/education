import React from "react";
import styles from "./LogoSlider.module.css";

const logos = [
  "arcelik.png",
  "trendyol.png",
  "aselsan.png",
  "ford.png",
  "tupras.png",
  "meta.png",
  "turktelekom.png",
  "vestel.png",
];

export default function LogoSlider() {
  return (
    <div className={styles["logo-slider-container"]}>
      <div className={styles["logo-slider-track"]}>
        {[...logos, ...logos].map((logo, i) => (
          <div className={styles["logo-slide"]} key={i}>
            <img
              src={`/logos/${logo}`}
              alt="partner-logo"
              className={styles["logo-slide"] + "_img"}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
