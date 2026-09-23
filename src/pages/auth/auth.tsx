import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { LoginFormData, RegisterFormData } from '../../contexts/AuthContext';
import { loginSchema, registerSchema } from '../../contexts/AuthContext';
import styles from './auth.module.css';

import userIcon from '../../assets/log.svg';
import lockIcon from '../../assets/lock.svg';
import loginImage from '../../assets/log-img.jpg';
import registerImage from '../../assets/reg-img.jpg';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, register: registerUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [serverError, setServerError] = useState('');

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    setServerError('');
    const result = await login(data);
    if (result.success) {
      navigate('/profile');
    } else {
      setServerError(result.error || 'Произошла ошибка');
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    setServerError('');
    const result = await registerUser(data);
    if (result.success) {
      navigate('/profile');
    } else {
      setServerError(result.error || 'Произошла ошибка');
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setServerError('');
    loginForm.reset();
    registerForm.reset();
  };

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = loginForm;

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = registerForm;

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <div className={styles.formSection}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${isLogin ? styles.activeTab : ''}`}
              onClick={() => !isLogin && switchMode()}
            >
              Вход
              <span className={isLogin ? styles.activeLine : ''}></span>
            </button>
            <button 
              className={`${styles.tab} ${!isLogin ? styles.activeTab : ''}`}
              onClick={() => isLogin && switchMode()}
            >
              Регистрация
              <span className={!isLogin ? styles.activeLine : ''}></span>
            </button>
          </div>

          {isLogin ? (
            <>
              <h2 className={styles.title}>С возвращением!</h2>
              <p className={styles.subtitle}>Войдите чтобы продолжить</p>
            </>
          ) : (
            <>
              <h2 className={styles.title}>Начнем регистрацию!</h2>
              <p className={styles.subtitle}>Введите данные чтобы продолжить</p>
            </>
          )}

          {serverError && (
            <div className={styles.errorMessage}>{serverError}</div>
          )}

          {isLogin && (
            <form onSubmit={handleLoginSubmit(onLoginSubmit)} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Номер телефона / E-mail*"
                  {...loginRegister('email')}
                  className={`${styles.input} ${loginErrors.email ? styles.inputError : ''}`}
                />
                <img src={userIcon} alt="user" className={styles.inputIcon} />
                {loginErrors.email && (
                  <span className={styles.errorText}>{loginErrors.email.message}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Пароль*"
                  {...loginRegister('password')}
                  className={`${styles.input} ${loginErrors.password ? styles.inputError : ''}`}
                />
                <img src={lockIcon} alt="lock" className={styles.inputIcon} />
                {loginErrors.password && (
                  <span className={styles.errorText}>{loginErrors.password.message}</span>
                )}
              </div>

              <div className={styles.options}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    {...loginRegister('rememberMe')}
                    className={styles.checkbox}
                  />
                  <span>Запомнить меня</span>
                </label>
                <button type="button" className={styles.forgotLink}>
                  Забыли пароль?
                </button>
              </div>

              <div className={styles.buttonWrapper}>
                <button type="submit" className={styles.submitButton} style={{ width: '259px', height: '57px' }}>
                  Войти
                </button>
              </div>
            </form>
          )}

          {!isLogin && (
            <form onSubmit={handleRegisterSubmit(onRegisterSubmit)} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Имя*"
                  {...registerRegister('firstName')}
                  className={`${styles.input} ${registerErrors.firstName ? styles.inputError : ''}`}
                />
                {registerErrors.firstName && (
                  <span className={styles.errorText}>{registerErrors.firstName.message}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Фамилия*"
                  {...registerRegister('lastName')}
                  className={`${styles.input} ${registerErrors.lastName ? styles.inputError : ''}`}
                />
                {registerErrors.lastName && (
                  <span className={styles.errorText}>{registerErrors.lastName.message}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Номер телефона / E-mail*"
                  {...registerRegister('email')}
                  className={`${styles.input} ${registerErrors.email ? styles.inputError : ''}`}
                />
                <img src={userIcon} alt="user" className={styles.inputIcon} />
                {registerErrors.email && (
                  <span className={styles.errorText}>{registerErrors.email.message}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Пароль*"
                  {...registerRegister('password')}
                  className={`${styles.input} ${registerErrors.password ? styles.inputError : ''}`}
                />
                <img src={lockIcon} alt="lock" className={styles.inputIcon} />
                {registerErrors.password && (
                  <span className={styles.errorText}>{registerErrors.password.message}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Подтвердите пароль*"
                  {...registerRegister('confirmPassword')}
                  className={`${styles.input} ${registerErrors.confirmPassword ? styles.inputError : ''}`}
                />
                <img src={lockIcon} alt="lock" className={styles.inputIcon} />
                {registerErrors.confirmPassword && (
                  <span className={styles.errorText}>{registerErrors.confirmPassword.message}</span>
                )}
              </div>

              <div className={styles.buttonWrapper}>
                <button type="submit" className={styles.submitButton} style={{ width: '373px', height: '58px' }}>
                  Зарегистрироваться
                </button>
              </div>
            </form>
          )}
        </div>

        <div className={styles.imageSection}>
          <img 
            src={isLogin ? loginImage : registerImage} 
            alt="Туризм" 
            className={styles.authImage} 
          />
        </div>
      </div>
    </div>
  );
};