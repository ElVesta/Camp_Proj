import React from 'react';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Container } from '../../components/container/container';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './ContactsPage.module.css';

import locationIcon from '../../assets/map.svg';
import phoneIcon from '../../assets/phone.svg';
import emailIcon from '../../assets/mail.png';
import clockIcon from '../../assets/clock.png';

export const ContactsPage: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={styles.contactsPage}>
      <Header />
      <Container>
        <h1 
  className={styles.title}
  style={{ color: isDark ? '#ffffff' : '#434e6f' }}
>
  Контакты
</h1>
        <div className={styles.content}>
          <div className={styles.infoSection}>
            <div className={styles.infoCard}>
              <h2 
                className={styles.sectionTitle}
                style={{ color: isDark ? '#434e6f' : '#434e6f' }}
              >
                Свяжитесь с нами
              </h2>
              
              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <img src={locationIcon} alt="Адрес" />
                </div>
                <div className={styles.contactDetails}>
                  <h3>Адрес</h3>
                  <p>220037 Минск, ул. Багратиона, 35</p>
                  <p>ИП Лимонова Габриелла Артуровна</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <img src={phoneIcon} alt="Телефон" />
                </div>
                <div className={styles.contactDetails}>
                  <h3>Телефон</h3>
                  <p>+375 (29) 511-77-77</p>
                  <p>+375 (44) 511-60-60</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <img src={emailIcon} alt="Email" />
                </div>
                <div className={styles.contactDetails}>
                  <h3>Email</h3>
                  <p>info@camping.by</p>
                  <p>arendapalatok@mail.ru</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <img src={clockIcon} alt="Время работы" />
                </div>
                <div className={styles.contactDetails}>
                  <h3>Время работы</h3>
                  <p>Понедельник-Пятница: с 10:00 до 20:00</p>
                  <p>Суббота и Воскресенье: Выходной</p>
                </div>
              </div>
            </div>

            <div className={styles.socialCard}>
              <h2 
                className={styles.sectionTitle}
                style={{ color: isDark ? '#434e6f' : '#434e6f' }}
              >
                Мы в соцсетях
              </h2>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink}>
                  <span>Instagram</span>
                </a>
                <a href="#" className={styles.socialLink}>
                  <span>Telegram</span>
                </a>
                <a href="#" className={styles.socialLink}>
                  <span>Viber</span>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.mapSection}>
            <div className={styles.mapCard}>
              <h2 
                className={styles.sectionTitle}
                style={{ color: isDark ? '#434e6f' : '#434e6f' }}
              >
                Как нас найти
              </h2>
              <div className={styles.mapContainer}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d586.541560446755!2d27.552953591799987!3d53.92553386386178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbcfa9698463c9%3A0xea68958e05117c7!2z0YPQuy4g0JHQsNCz0YDQsNGC0LjQvtC90LAgMjUsINCc0LjQvdGB0LosINCc0LjQvdGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMLCAyMjAwMDA!5e0!3m2!1sru!2sby!4v1747390000000!5m2!1sru!2sby"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Карта офиса"
                ></iframe>
              </div>
              <div className={styles.addressHint}>
                <p>Ближайшая парковка: ул. Багратиона, 35 (за зданием)</p>
                <p>Ближайшее метро: ст. "Площадь Победы" (15 минут пешком)</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};