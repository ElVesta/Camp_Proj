import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Container } from '../../components/container/container';
import { Button } from '../../components/button/button';
import { Counter } from '../../components/counter/counter';
import { useCart } from '../../contexts/cartcontext';
import { useFavorites } from '../../contexts/favcontext';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../contexts/ProductsContext';
import styles from './ProductPage.module.css';

import starIcon from '../../assets/like.png';
import starIconFilled from '../../assets/like-fill.png';

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const { products, loading } = useProducts();
  
  const [product, setProduct] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [rentDays, setRentDays] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs'>('description');
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      const found = products.find(p => p.id === Number(id));
      if (found) {
        setProduct(found);
        setFavorite(isFavorite(found.id));
      } else {
        navigate('/catalog');
      }
    }
  }, [id, products, navigate, isFavorite]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Пожалуйста, войдите или зарегистрируйтесь');
      navigate('/login');
      return;
    }
    if (product) {
      addToCart({ id: product.id, name: product.title, price: product.price, image: product.thumbnail }, rentDays, quantity);
      alert(`Товар "${product.title}" добавлен в корзину!`);
    }
  };

  const handleFavorite = () => {
    if (!isAuthenticated) {
      alert('Пожалуйста, войдите или зарегистрируйтесь');
      navigate('/login');
      return;
    }
    if (product) {
      if (favorite) {
        removeFromFavorites(product.id);
        setFavorite(false);
      } else {
        addToFavorites({ id: product.id, name: product.title, price: product.price, image: product.thumbnail }, quantity, rentDays);
        setFavorite(true);
      }
    }
  };

  const getDiscount = (days: number) => {
    if (days >= 7) return 15;
    if (days >= 5) return 10;
    if (days >= 3) return 5;
    return 0;
  };

  if (loading || !product) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  const discount = getDiscount(rentDays);
  const totalPrice = product.price * rentDays * quantity;
  const priceWithDiscount = totalPrice * (1 - discount / 100);

  return (
    <div className={styles.productPage}>
      <Header />
      <Container>
        <div className={styles.productContainer}>
          <div className={styles.imageSection}>
            <div className={styles.imageBlock}>
              <img src={product.thumbnail} alt={product.title} className={styles.mainImage} />
            </div>
          </div>

          <div className={styles.infoSection}>
            <h1 className={styles.title}>{product.title}</h1>
            
            <div className={styles.priceRow}>
              <span className={styles.priceLabel}>Цена за день:</span>
              <span className={styles.priceValue}>{product.price.toFixed(2)} BYN</span>
            </div>
            
            <div className={styles.rentSection}>
              <div className={styles.rentHeader}>
                <span>Срок аренды</span>
                {discount > 0 && <span className={styles.discountBadge}>скидка {discount}%</span>}
              </div>
              <select 
                className={styles.rentSelect}
                value={rentDays}
                onChange={(e) => setRentDays(Number(e.target.value))}
              >
                <option value={1}>1 день - скидка 0%</option>
                <option value={3}>3 дня - скидка 5%</option>
                <option value={5}>5 дней - скидка 10%</option>
                <option value={7}>7 дней - скидка 15%</option>
                <option value={10}>10 дней - скидка 15%</option>
                <option value={14}>14 дней - скидка 15%</option>
              </select>
            </div>

            <div className={styles.totalSection}>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Итого:</span>
                <span className={styles.totalValue}>{priceWithDiscount.toFixed(2)} BYN</span>
              </div>
              {discount > 0 && (
                <div className={styles.oldTotalRow}>
                  <span className={styles.oldTotalLabel}>Без скидки:</span>
                  <span className={styles.oldTotalValue}>{totalPrice.toFixed(2)} BYN</span>
                </div>
              )}
            </div>

            <div className={styles.actions}>
              <div className={styles.counterWrapper}>
                <Counter 
                  value={quantity}
                  onIncrease={() => setQuantity(quantity + 1)}
                  onDecrease={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                />
              </div>
              <Button text="В корзину" onClick={handleAddToCart} width={200} />
              <button className={styles.favoriteBtn} onClick={handleFavorite}>
                <img src={favorite ? starIconFilled : starIcon} alt="Избранное" />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'description' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Описание
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'specs' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('specs')}
          >
            Характеристики
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'description' && (
            <div className={styles.description}>
              <p>{product.description || 'Описание отсутствует'}</p>
            </div>
          )}
          {activeTab === 'specs' && (
            <div className={styles.specs}>
              <ul>
                <li><strong>Категория:</strong> {product.category}</li>
                <li><strong>Рейтинг:</strong> {product.rating || 'Нет оценок'}</li>
                <li><strong>В наличии:</strong> {product.stock > 0 ? 'Да' : 'Нет'}</li>
                <li><strong>Сезон:</strong> {product.season || 'Все сезоны'}</li>
              </ul>
            </div>
          )}
        </div>
      </Container>
      <Footer />
    </div>
  );
};