import { useTheme } from '../../contexts/ThemeContext';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Container } from '../../components/container/container';
import { MainInfo } from '../../components/mainInfo/mainInfo';
import { About } from '../../components/about/about';
import { Catalog } from '../../components/catalog/catalog';
import mountain from '../../assets/main.png';
import mountainDark from '../../assets/main-dark.png';
import styles from './home.module.css';

export const Home = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={styles.home} style={{ backgroundColor: isDark ? '#434e6f' : '#ffffff' }}>
      <Header/>
      <Container>
        <div className={styles.centerContent}>
          <img 
            src={isDark ? mountainDark : mountain} 
            alt="Горы" 
            className={styles.centerImage} 
          />
        </div>
        <MainInfo />
        <div className={styles.catalogSection}>
          <h2 className={styles.catalogTitle} style={{ color: isDark ? '#ffffff' : '#434e6f' }}>
            Наш ассортимент
          </h2>
          <Catalog />
          <div className={styles.buttonWrapper}>
            <button 
              className={styles.catalogButton} 
              onClick={() => window.location.href = '/catalog'}
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
        </div>
        <About />
      </Container>
      <Footer/>
    </div>
  );
};