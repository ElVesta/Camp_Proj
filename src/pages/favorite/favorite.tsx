import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Container } from '../../components/container/container';
import { LikeCard } from '../../components/likecard/likecard';
import { useFavorites } from '../../contexts/favcontext';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './favorite.module.css';

export const FavoritesPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { favorites } = useFavorites();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!isAuthenticated) {
      alert('Войдите или зарегистрируйтесь, чтобы просмотреть избранное');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.favoritesPage}>
      <Header/>
      <Container>
        <h2 
          className={styles.title}
          style={{ color: isDark ? '#ffffff' : '#434e6f' }}
        >
          Избранное
        </h2>
        
        {favorites.length > 0 ? (
          <div className={styles.favoritesList}>
            {favorites.map((item) => (
              <LikeCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
              />
            ))}
          </div>
        ) : (
          <p 
            className={styles.emptyMessage}
            style={{ color: isDark ? '#ffffff' : '#999999' }}
          >
            У вас пока нет избранных товаров
          </p>
        )}
      </Container>
      <Footer/>
    </div>
  );
};