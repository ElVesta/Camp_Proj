import React from "react";
import styles from "./footer.module.css";

import locationIcon from "../../assets/map.svg";
import phoneIcon from "../../assets/phone.svg";
import logoImage from "../../assets/logo.svg";

export const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      
      <div className={styles.logo}>
        <img src={logoImage} alt="CAMP_PACK" className={styles.logoImage} />
      </div>

      <div className={styles.company}>
        <div className={styles.title}>Компания</div>
        <div>Условия проката</div>
        <div>Реквизиты</div>
        <div>Отзывы</div>
      </div>

      <div className={styles.info}>
        <div className={styles.title}>Информация</div>
        <div>Договор-Оферта</div>
        <div>Вопрос-ответ</div>
        <div>Контакты</div>
      </div>

      <div className={styles.contacts}>
        <div className={styles.contactItem}>
          <img src={locationIcon} alt="location" />
          <p>
            220037 Минск ул. Багратиона, 35
            ИП Лимонова Габриелла Артуровна
          </p>
        </div>

        <div className={styles.contactItem}>
          <img src={phoneIcon} alt="phone" />
          <div>+375 (29) 511-77-77</div>
        </div>
      </div>

      <div className={styles.time}>
        <p>Понедельник-Пятница: с 10:00 до 20:00</p>
        <p>Суббота и Воскресенье: Выходной</p>
      </div>

    </div>
  );
};