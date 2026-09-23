import React from "react";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import mimg2 from "../../assets/mimg2.png";
import mimg1 from "../../assets/mimg1.png";
import styles from "./mainInfo.module.css";

export const MainInfo: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleGoToCatalog = () => {
    navigate('/catalog');
  };

  return (
    <div className={styles.mainInfo}>
      <img className={styles.leftImage} alt="left" src={mimg1} />
      <img className={styles.rightImage} alt="right" src={mimg2} />

      <div className={styles.title} style={{ color: isDark ? '#ffffff' : '#434e6f' }}>
        Выбери свое снаряжение
      </div>
      
      <p className={styles.text} style={{ color: isDark ? '#ffffff' : '#000000' }}>
        Здесь вы найдёте снаряжение для любых условий, будь то лёгкая прогулка
        по лесу или недельная экспедиция в горы. Удобный поиск и подробные
        описания помогут быстро подобрать всё, что нужно именно вам.
      </p>
      
      <p className={styles.textBottom} style={{ color: isDark ? '#ffffff' : '#000000' }}>
        Сделайте первый шаг к незабываемым впечатлениям, загляните в каталог и
        соберите свой идеальный комплект для отдыха на природе!
      </p>
      
      <button 
        className={styles.button} 
        onClick={handleGoToCatalog}
        style={{
          borderColor: isDark ? '#ffffff' : '#434e6f',
          color: isDark ? '#ffffff' : '#434e6f'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isDark ? '#ffffff' : '#434e6f';
          e.currentTarget.style.color = isDark ? '#434e6f' : '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = isDark ? '#ffffff' : '#434e6f';
          e.currentTarget.style.borderColor = isDark ? '#ffffff' : '#434e6f';
        }}
      >
        Перейти в каталог
      </button>
    </div>
  );
};