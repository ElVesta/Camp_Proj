import React from "react";
import { useTheme } from '../../contexts/ThemeContext';
import styles from "./about.module.css";

import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";

export const About: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={styles.about}>
      <h2 className={styles.title} style={{ color: isDark ? '#ffffff' : '#434e6f' }}>
        О нас
      </h2>

      <div className={styles.grid}>
        <div className={styles.column}>
          <img src={img1} alt="main" className={styles.image} />
          <p className={styles.text} style={{ color: isDark ? '#ffffff' : '#000000' }}>
            Мы команда, которая верит, что путешествия должны быть доступными
            каждому. Наш сервис создан для того, чтобы вы могли отправиться в
            поход или кемпинг без лишних затрат и хлопот.
          </p>
        </div>

        <div className={styles.column}>
          <p className={styles.textTop} style={{ color: isDark ? '#ffffff' : '#000000' }}>
            Мы верим, что активный отдых не должен зависеть от времени года.
            Каждый сезон открывает свои возможности для движения и приключений.
          </p>
          <div 
            className={styles.image} 
            style={{ backgroundImage: `url(${img2})` }}
          />
        </div>

        <div className={styles.column}>
          <div 
            className={styles.image} 
            style={{ backgroundImage: `url(${img3})` }}
          />
          <p className={styles.text} style={{ color: isDark ? '#ffffff' : '#000000' }}>
            Активный отдых это не просто спорт, а способ почувствовать себя
            живым и наполненным энергией. Каждое путешествие дарит новые
            впечатления, знакомит с природой и помогает отвлечься от
            повседневной суеты.
          </p>
        </div>
      </div>
    </div>
  );
};