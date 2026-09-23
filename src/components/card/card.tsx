import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/cartcontext';
import { useFavorites } from '../../contexts/favcontext';
import { Counter } from "../counter/counter";
import { AddToCartButton } from "../addbutton/addbtn";
import { useAuth } from '../../contexts/AuthContext';
import styles from "./card.module.css";

import starIcon from "../../assets/like.png";
import starIconFilled from "../../assets/like-fill.png";

interface CardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const Card: React.FC<CardProps> = ({ id, name, price, image }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [rentDays, setRentDays] = useState(1);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(id));
  }, [id, isFavorite]);

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Войдите или зарегистрируйтесь, чтобы добавить товар в корзину');
      navigate('/login');
      return;
    }
    addToCart({ id, name, price, image }, rentDays, quantity);
    console.log("Добавлено в корзину:", { id, name, quantity, price, rentDays });
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Войдите или зарегистрируйтесь, чтобы добавить товар в избранное');
      navigate('/login');
      return;
    }
    if (favorite) {
      removeFromFavorites(id);
      setFavorite(false);
      console.log("Удалено из избранного:", id);
    } else {
      addToFavorites({ id, name, price, image }, quantity, rentDays);
      setFavorite(true);
      console.log("Добавлено в избранное:", { id, name, quantity, rentDays });
    }
  };

  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityDecrease = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  const handleRentDaysChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    setRentDays(Number(e.target.value));
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card} onClick={handleCardClick}>
        <div className={styles.imageWrapper}>
          <img src={image} alt={name} className={styles.image} />
        </div>

        <h3 className={styles.title}>{name}</h3>
        <div className={styles.rentLabel}>Дни аренды/ скидка</div>

        <div className={styles.selectWrapper}>
          <select 
            className={styles.select}
            value={rentDays}
            onChange={handleRentDaysChange}
            onClick={(e) => e.stopPropagation()}
          >
            <option value={1}>1 сутки скидка - 0%</option>
            <option value={3}>3 суток скидка - 5%</option>
            <option value={5}>5 суток скидка - 10%</option>
            <option value={7}>7 суток скидка - 15%</option>
          </select>
          <img className={styles.selectArrow} src="src/assets/arrow.svg" alt="arrow" />
        </div>

        <div className={styles.price}>{price.toFixed(2)} BYN</div>

        <div className={styles.actions}>
          <div onClick={(e) => e.stopPropagation()}>
            <Counter 
              value={quantity}
              onIncrease={handleQuantityIncrease}
              onDecrease={handleQuantityDecrease}
            />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <AddToCartButton onClick={handleAddToCart} />
          </div>
        </div>

        <button 
          className={`${styles.favoriteBtn} ${favorite ? styles.active : ''}`} 
          onClick={handleFavorite}
        >
          <img src={favorite ? starIconFilled : starIcon} alt="В избранное" />
        </button>
      </div>
    </div>
  );
};