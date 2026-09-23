import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/cartcontext';
import { useFavorites } from '../../contexts/favcontext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { SearchBar } from '../search/SearchBar';
import styles from './header.module.css';

import starI from '../../assets/star.svg';
import basketI from '../../assets/basket.svg';
import moonI from '../../assets/moon.svg';
import sunI from '../../assets/sun.png';
import profileIcon from '../../assets/log.svg';

export const Header = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className={styles.header}>
      <SearchBar />
      
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>Главная</Link>
        <Link to="/catalog" className={styles.navLink}>Каталог</Link>
        <Link to="/contacts" className={styles.navLink}>Контакты</Link>
      </nav>

      <div className={styles.rightPanel}>
        <Link to="/favorite" className={styles.iconLink}>
          <img src={starI} alt="Избранное" />
          {totalFavorites > 0 && (
            <span className={styles.favoriteBadge}>{totalFavorites}</span>
          )}
        </Link>
        
        <Link to="/basket" className={styles.iconLink}>
          <img src={basketI} alt="Корзина" />
          {totalItems > 0 && (
            <span className={styles.cartBadge}>{totalItems}</span>
          )}
        </Link>
        
        <Link to={isAuthenticated ? "/profile" : "/login"} className={styles.profileLink}>
          <img src={profileIcon} alt="Профиль" />
        </Link>
        
        <button className={styles.authBtn} onClick={handleAuthClick}>
          {isAuthenticated ? "Выйти" : "Вход"}
        </button>
        
        <button className={styles.themeToggle} onClick={toggleTheme}>
          <img src={theme === 'light' ? moonI : sunI} alt="Переключить тему" />
        </button>
      </div>
    </header>
  );
};