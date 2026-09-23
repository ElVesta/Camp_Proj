import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Container } from '../../components/container/container';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './profile.module.css';

import profileImg from '../../assets/profile-img.jpg';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const validatePhone = (phone: string) => {
    if (!phone || phone.trim() === '') return true;
    const phoneRegex = /^[\d\s\+\(\)\-]{7,20}$/;
    return phoneRegex.test(phone);
  };

  const handleEditProfile = async () => {
    if (isEditing) {
      if (!formData.name.trim()) {
        setErrorMessage('Имя обязательно для заполнения');
        return;
      }
      if (formData.name.trim().length < 2) {
        setErrorMessage('Имя должно содержать минимум 2 символа');
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setErrorMessage('Введите корректный email');
        return;
      }
      
      if (!validatePhone(formData.phone)) {
        setErrorMessage('Введите корректный номер телефона (только цифры, +, -, пробелы, скобки)');
        return;
      }
      
      setErrorMessage('');
      const result = await updateUser(formData);
      if (result.success) {
        setIsEditing(false);
        alert('Профиль успешно обновлен!');
      } else {
        setErrorMessage(result.error || 'Ошибка при обновлении профиля');
      }
    } else {
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
      });
      setIsEditing(true);
      setErrorMessage('');
    }
  };

  const handleGoToCart = () => {
    navigate('/basket');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9+\-\(\)\s]/g, '');
    setFormData(prev => ({ ...prev, phone: filteredValue }));
    if (errorMessage) setErrorMessage('');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const primaryButtonStyle = {
    flex: 1,
    padding: '12px 20px',
    background: isDark ? '#ffffff' : '#ffffff',
    border: `3px solid ${isDark ? '#ffffff' : '#434e6f'}`,
    borderRadius: '10px',
    color: isDark ? '#434e6f' : '#434e6f',
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const logoutButtonStyle = {
    flex: 1,
    padding: '12px 20px',
    background: isDark ? '#ffffff' : 'transparent',
    border: `3px solid ${isDark ? '#434e6f' : '#434e6f'}`,
    borderRadius: '10px',
    color: isDark ? '#434e6f' : '#434e6f',
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  return (
    <div className={styles.profilePage}>
      <Header/>
      <Container>
        <h1 
          className={styles.title}
          style={{ color: isDark ? '#ffffff' : '#434e6f' }}
        >
          Профиль
        </h1>
        
        <div className={styles.profileContent}>
          <div className={styles.leftColumn}>
            <div className={styles.avatarWrapper}>
              <img src={profileImg} alt="Avatar" className={styles.avatar} />
            </div>
            <h2 
              className={styles.userName}
              style={{ color: isDark ? '#ffffff' : '#434e6f' }}
            >
              {user.name}
            </h2>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.infoCard}>
              {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
              )}
              
              <div className={styles.infoRow}>
                <span 
                  className={styles.infoLabel}
                  style={{ color: isDark ? '#ffffff' : '#434e6f' }}
                >
                  ФИО
                </span>
                {!isEditing ? (
                  <div className={styles.infoValue}>{user.name}</div>
                ) : (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`${styles.infoInput} ${errorMessage && !formData.name ? styles.inputError : ''}`}
                  />
                )}
              </div>
              
              <div className={styles.infoRow}>
                <span 
                  className={styles.infoLabel}
                  style={{ color: isDark ? '#ffffff' : '#434e6f' }}
                >
                  Email
                </span>
                {!isEditing ? (
                  <div className={styles.infoValue}>{user.email}</div>
                ) : (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${styles.infoInput} ${errorMessage && errorMessage.includes('email') ? styles.inputError : ''}`}
                  />
                )}
              </div>
              
              <div className={styles.infoRow}>
                <span 
                  className={styles.infoLabel}
                  style={{ color: isDark ? '#ffffff' : '#434e6f' }}
                >
                  Телефон
                </span>
                {!isEditing ? (
                  <div className={styles.infoValue}>{user.phone || 'Не указан'}</div>
                ) : (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={styles.infoInput}
                    placeholder="+375 29 555-55-77"
                  />
                )}
              </div>
              
              <div className={styles.infoRow}>
                <span 
                  className={styles.infoLabel}
                  style={{ color: isDark ? '#ffffff' : '#434e6f' }}
                >
                  Адрес доставки
                </span>
                {!isEditing ? (
                  <div className={styles.infoValue}>{user.address || 'Не указан'}</div>
                ) : (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={styles.infoInput}
                    placeholder="ул.Белорусская 21, г.Минск"
                  />
                )}
              </div>
            </div>

            <div className={styles.buttonsRow}>
              <button 
                style={primaryButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#434e6f';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = isDark ? '#ffffff' : '#434e6f';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? '#ffffff' : '#ffffff';
                  e.currentTarget.style.color = '#434e6f';
                  e.currentTarget.style.borderColor = isDark ? '#ffffff' : '#434e6f';
                }}
                onClick={handleEditProfile}
              >
                {isEditing ? "Сохранить" : "Редактировать профиль"}
              </button>
              
              <button 
                style={primaryButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#434e6f';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = isDark ? '#ffffff' : '#434e6f';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? '#ffffff' : '#ffffff';
                  e.currentTarget.style.color = '#434e6f';
                  e.currentTarget.style.borderColor = isDark ? '#ffffff' : '#434e6f';
                }}
                onClick={handleGoToCart}
              >
                Перейти в корзину
              </button>
              
              <button 
                style={logoutButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#434e6f';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = '#434e6f';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? '#ffffff' : 'transparent';
                  e.currentTarget.style.color = '#434e6f';
                  e.currentTarget.style.borderColor = '#434e6f';
                }}
                onClick={handleLogout}
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </Container>
      <Footer/>
    </div>
  );
};