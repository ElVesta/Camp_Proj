import React, { useState, forwardRef } from "react";
import { useTheme } from '../../contexts/ThemeContext';
import styles from "./orderForm.module.css";

interface OrderFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  startDate: string;
  endDate: string;
}

interface OrderFormProps {
  onSubmit: (data: OrderFormData) => void;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  startDate?: string;
  endDate?: string;
}

export const OrderForm = forwardRef<HTMLFormElement, OrderFormProps>(({ onSubmit }, ref) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: "Елисеева Веста Олеговна",
    email: "vestaeliseeva36@gmail.com",
    phone: "+375292200429",
    address: "ул. Бобруйская 21, Минск",
    startDate: "2026-05-22",
    endDate: "2026-05-30",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({
    fullName: true,
    email: true,
    phone: true,
    address: true,
    startDate: true,
    endDate: true,
  });

  const validateEmail = (email: string) => {
    if (!email) return "Email обязателен";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "Неверный формат email";
    return "";
  };

  const validatePhone = (phone: string) => {
    if (!phone) return "Телефон обязателен";
    const cleanPhone = phone.replace(/\s/g, '');
    const regex = /^[\+\(\)\d-]{7,20}$/;
    if (!regex.test(cleanPhone)) return "Неверный формат телефона";
    return "";
  };

  const validateField = (name: string, value: string, allData?: OrderFormData): string => {
    const data = allData || formData;
    
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Имя и фамилия обязательны";
        if (value.trim().length < 3) return "Введите корректное имя и фамилию";
        return "";
      case "email":
        return validateEmail(value);
      case "phone":
        return validatePhone(value);
      case "address":
        if (!value.trim()) return "Адрес доставки обязателен";
        return "";
      case "startDate":
        if (!value) return "Дата начала обязательна";
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const start = new Date(value);
        if (start < today) return "Дата начала не может быть раньше сегодня";
        return "";
      case "endDate":
        if (!value) return "Дата окончания обязательна";
        if (data.startDate) {
          const start = new Date(data.startDate);
          const end = new Date(value);
          if (end <= start) return "Дата окончания должна быть позже даты начала";
        }
        return "";
      default:
        return "";
    }
  };

  const validateAll = (data: OrderFormData): boolean => {
    const newErrors: FormErrors = {};
    
    newErrors.fullName = validateField("fullName", data.fullName, data);
    newErrors.email = validateField("email", data.email, data);
    newErrors.phone = validateField("phone", data.phone, data);
    newErrors.address = validateField("address", data.address, data);
    newErrors.startDate = validateField("startDate", data.startDate, data);
    newErrors.endDate = validateField("endDate", data.endDate, data);
    
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    if (touched[name]) {
      const error = validateField(name, value, newFormData);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value, formData);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const allTouched = {
      fullName: true,
      email: true,
      phone: true,
      address: true,
      startDate: true,
      endDate: true,
    };
    setTouched(allTouched);
    
    if (validateAll(formData)) {
      onSubmit(formData);
    } else {
      alert("Пожалуйста, заполните все поля корректно");
    }
  };

  return (
    <form ref={ref} onSubmit={handleSubmit} className={styles.orderForm}>
      <div className={styles.formRow}>
        <div className={styles.formField}>
          <label 
            className={styles.label}
            style={{ color: isDark ? '#ffffff' : '#434e6f' }}
          >
            ФИО
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.fullName && touched.fullName ? styles.inputError : ''}`}
            placeholder="Лимонова Анастасия Аркадьевна"
          />
          {errors.fullName && touched.fullName && (
            <span className={styles.errorText}>{errors.fullName}</span>
          )}
        </div>
        
        <div className={styles.formField}>
          <label 
            className={styles.label}
            style={{ color: isDark ? '#ffffff' : '#434e6f' }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.email && touched.email ? styles.inputError : ''}`}
            placeholder="nastya@gmail.com"
          />
          {errors.email && touched.email && (
            <span className={styles.errorText}>{errors.email}</span>
          )}
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formField}>
          <label 
            className={styles.label}
            style={{ color: isDark ? '#ffffff' : '#434e6f' }}
          >
            Телефон
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.phone && touched.phone ? styles.inputError : ''}`}
            placeholder="+375 29 555-55-77"
          />
          {errors.phone && touched.phone && (
            <span className={styles.errorText}>{errors.phone}</span>
          )}
        </div>
        
        <div className={styles.formField}>
          <label 
            className={styles.label}
            style={{ color: isDark ? '#ffffff' : '#434e6f' }}
          >
            Адрес доставки
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.address && touched.address ? styles.inputError : ''}`}
            placeholder="ул.Белорусская 21, г.Минск"
          />
          {errors.address && touched.address && (
            <span className={styles.errorText}>{errors.address}</span>
          )}
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formField}>
          <label 
            className={styles.label}
            style={{ color: isDark ? '#ffffff' : '#434e6f' }}
          >
            Дата начала аренды
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.startDate && touched.startDate ? styles.inputError : ''}`}
          />
          {errors.startDate && touched.startDate && (
            <span className={styles.errorText}>{errors.startDate}</span>
          )}
        </div>
        
        <div className={styles.formField}>
          <label 
            className={styles.label}
            style={{ color: isDark ? '#ffffff' : '#434e6f' }}
          >
            Дата конца аренды
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.endDate && touched.endDate ? styles.inputError : ''}`}
          />
          {errors.endDate && touched.endDate && (
            <span className={styles.errorText}>{errors.endDate}</span>
          )}
        </div>
      </div>
    </form>
  );
});

OrderForm.displayName = 'OrderForm';