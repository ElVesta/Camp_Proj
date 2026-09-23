import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Container } from '../../components/container/container';
import { CartCard } from '../../components/basketcard/basketcard';
import { OrderForm } from '../../components/orderForm/orderForm';
import { OrderSummary } from '../../components/orderSummary/orderSummary';
import { useCart } from '../../contexts/cartcontext';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './basket.module.css';

export const CartPage = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const { cartItems, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!isAuthenticated) {
      alert('Войдите или зарегистрируйтесь, чтобы просмотреть корзину');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleOrderSubmit = (formData: any) => {
    console.log("Заказ оформлен!", {
      ...formData,
      items: cartItems,
      totalPrice: cartItems.reduce((sum, item) => sum + item.price * item.quantity * item.rentDays, 0)
    });
    alert("Заказ успешно оформлен!");
    clearCart();
  };

  const handleButtonClick = () => {
    if (formRef.current) {
      const event = new Event('submit', { bubbles: true, cancelable: true });
      formRef.current.dispatchEvent(event);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.cartPage}>
      <Header/>
      <Container>
        <h2 
          className={styles.title}
          style={{ color: isDark ? '#ffffff' : '#434e6f' }}
        >
          Корзина
        </h2>
        
        {cartItems.length > 0 ? (
          <>
            <div className={styles.contentWrapper}>
              <div className={styles.leftColumn}>
                <div className={styles.cartList}>
                  {cartItems.map((item) => (
                    <CartCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      quantity={item.quantity}
                      rentDays={item.rentDays}
                    />
                  ))}
                </div>
              </div>
              
              <div className={styles.rightColumn}>
                <OrderSummary />
              </div>
            </div>
            
            <div className={styles.formSection}>
              <OrderForm ref={formRef} onSubmit={handleOrderSubmit} />
            </div>
            
<div className={styles.orderButtonWrapper}>
  <button 
    className={styles.orderButton}
    onClick={handleButtonClick}
    style={{
      width: '388px',
      height: '72px',
      background: isDark ? 'transparent' : 'transparent',
      border: isDark ? '3.88px solid #ffffff' : '3.88px solid #434e6f',
      borderRadius: '10px',
      color: isDark ? '#ffffff' : '#434e6f',
      fontFamily: 'Inter, sans-serif',
      fontSize: '28.7px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }}
    onMouseEnter={(e) => {
      if (isDark) {
        e.currentTarget.style.background = '#ffffff';
        e.currentTarget.style.color = '#434e6f';
      } else {
        e.currentTarget.style.background = '#434e6f';
        e.currentTarget.style.color = '#ffffff';
      }
    }}
    onMouseLeave={(e) => {
      if (isDark) {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = '#ffffff';
      } else {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = '#434e6f';
      }
    }}
  >
    Оформить заказ
  </button>
</div>
          </>
        ) : (
          <p 
            className={styles.emptyMessage}
            style={{ color: isDark ? '#ffffff' : '#999999' }}
          >
            Ваша корзина пуста
          </p>
        )}
      </Container>
      <Footer/>
    </div>
  );
};