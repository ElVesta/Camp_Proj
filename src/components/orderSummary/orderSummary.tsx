import React from "react";
import { useCart } from "../../contexts/cartcontext";
import styles from "./orderSummary.module.css";

export const OrderSummary: React.FC = () => {
  const { cartItems } = useCart();
  
  const getDiscount = (days: number) => {
    if (days >= 7) return 15;
    if (days >= 5) return 10;
    if (days >= 3) return 5;
    return 0;
  };
  
  const totalWithDiscount = cartItems.reduce((sum, item) => {
    const discount = getDiscount(item.rentDays);
    const itemTotal = item.price * item.quantity * item.rentDays;
    const itemDiscount = discount > 0 ? itemTotal * discount / 100 : 0;
    return sum + (itemTotal - itemDiscount);
  }, 0);
  
  const totalWithoutDiscount = cartItems.reduce((sum, item) => 
    sum + item.price * item.quantity * item.rentDays, 0
  );
  
  const totalDiscount = totalWithoutDiscount - totalWithDiscount;

  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <span className={styles.headerText}>Ваш заказ</span>
      </div>
      
      <div className={styles.divider} />
      
      <div className={styles.itemsList}>
        {cartItems.map((item) => {
          const discount = getDiscount(item.rentDays);
          const itemTotal = item.price * item.quantity * item.rentDays;
          const itemTotalWithDiscount = discount > 0 ? itemTotal * (1 - discount / 100) : itemTotal;
          
          return (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemInfo}>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemDetails}>
                  аренда: {item.rentDays} {getDaysWord(item.rentDays)} • {item.quantity} шт x {item.price.toFixed(2)} BYN
                </div>
              </div>
              <div className={styles.itemTotal}>
                {itemTotalWithDiscount.toFixed(2)} BYN
              </div>
            </div>
          );
        })}
      </div>
      
      <div className={styles.divider} />
      
      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>Итого:</span>
        <span className={styles.totalValue}>{totalWithDiscount.toFixed(2)} BYN</span>
      </div>
      
      {totalDiscount > 0 && (
        <div className={styles.savedRow}>
          <span className={styles.savedLabel}>Ваша скидка:</span>
          <span className={styles.savedValue}>-{totalDiscount.toFixed(2)} BYN</span>
        </div>
      )}
    </div>
  );
};

function getDaysWord(days: number): string {
  if (days % 10 === 1 && days % 100 !== 11) return 'день';
  if (days % 10 >= 2 && days % 10 <= 4 && (days % 100 < 10 || days % 100 >= 20)) return 'дня';
  return 'дней';
}