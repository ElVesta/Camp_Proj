import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/cartcontext';
import { useFavorites } from '../../contexts/favcontext';
import { useAuth } from '../../contexts/AuthContext';
import { Counter } from "../counter/counter";
import { AddToCartButton } from "../addbutton/addbtn";
import styles from "./likecard.module.css";
import delIcon from "../../assets/del.svg";

interface LikeCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

export const LikeCard: React.FC<LikeCardProps> = ({ 
  id, name, price, image, 
  quantity: initialQuantity = 1
}) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(initialQuantity);
  const { addToCart } = useCart();
  const { removeFromFavorites, updateFavoriteQuantity } = useFavorites();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Войдите или зарегистрируйтесь, чтобы добавить товар в корзину');
      navigate('/login');
      return;
    }
    addToCart({ id, name, price, image }, 1, quantity);
    console.log("Добавлено в корзину из избранного:", { id, name, quantity, price });
  };

  const handleRemove = () => {
    if (!isAuthenticated) {
      alert('Войдите или зарегистрируйтесь');
      navigate('/login');
      return;
    }
    removeFromFavorites(id);
    console.log("Удалено из избранного:", id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    updateFavoriteQuantity(id, newQuantity);
  };

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className={styles.likeCard}>
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
          onDecrease={() => handleQuantityChange(quantity > 1 ? quantity - 1 : 1)}
        />
      </div>
      
      <div className={styles.cartButtonWrapper}>
        <AddToCartButton onClick={handleAddToCart} />
      </div>
      
      <button className={styles.removeBtn} onClick={handleRemove}>
        <img src={delIcon} alt="Удалить" />
      </button>
    </div>
  );
};