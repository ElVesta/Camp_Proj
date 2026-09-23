import React from "react";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/cartcontext';
import { useAuth } from '../../contexts/AuthContext';
import { Counter } from "../counter/counter";
import styles from "./basketcard.module.css";

import delIcon from "../../assets/del.svg";

interface CartCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  rentDays: number;
}

export const CartCard: React.FC<CartCardProps> = ({ id, name, price, image, quantity, rentDays }) => {
  const navigate = useNavigate();
  const { updateQuantity, updateRentDays, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleQuantityChange = (newQuantity: number) => {
    if (!isAuthenticated) {
      alert('Войдите или зарегистрируйтесь');
      navigate('/login');
      return;
    }
    updateQuantity(id, newQuantity);
  };

  const handleRentDaysChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isAuthenticated) {
      alert('Войдите или зарегистрируйтесь');
      navigate('/login');
      return;
    }
    updateRentDays(id, Number(e.target.value));
  };

  const handleRemove = () => {
    if (!isAuthenticated) {
      alert('Войдите или зарегистрируйтесь');
      navigate('/login');
      return;
    }
    removeFromCart(id);
  };

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className={styles.cartCard}>
      <div className={styles.imageWrapper} onClick={handleProductClick}>
        <img src={image} alt={name} className={styles.image} />
      </div>
      
      <div className={styles.title} onClick={handleProductClick}>
        {name}
      </div>
      
      <div className={styles.price}>{price.toFixed(2)} BYN</div>
      
      <div className={styles.counterWrapper}>
        <Counter 
          value={quantity}
          onIncrease={() => handleQuantityChange(quantity + 1)}
          onDecrease={() => handleQuantityChange(quantity - 1)}
        />
      </div>

      <button className={styles.removeBtn} onClick={handleRemove}>
        <img src={delIcon} alt="Удалить" />
      </button>
      
      <div className={styles.rentSection}>
        <select 
          value={rentDays} 
          onChange={handleRentDaysChange}
          className={styles.rentSelect}
        >
          <option value={1}>1 день - скидка 0%</option>
          <option value={3}>3 дня - скидка 5%</option>
          <option value={5}>5 дней - скидка 10%</option>
          <option value={7}>7 дней - скидка 15%</option>
          <option value={10}>10 дней - скидка 15%</option>
          <option value={14}>14 дней - скидка 15%</option>
        </select>
      </div>
    </div>
  );
};