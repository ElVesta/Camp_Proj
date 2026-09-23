import React, { useState } from "react";
import styles from "./sortButton.module.css";
import { useTheme } from '../../contexts/ThemeContext';
import arrowLight from "../../assets/whitearrow.png"; 
import arrowDark from "../../assets/arrow.svg";

export type SortType = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

interface SortButtonProps {
  onSortChange: (sort: SortType) => void;
}

export const SortButton: React.FC<SortButtonProps> = ({ onSortChange }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState<SortType>('name-asc');

  const getButtonText = () => {
    switch (currentSort) {
      case 'name-asc': return 'от A до Я';
      case 'name-desc': return 'от Я до A';
      case 'price-asc': return 'по возрастанию цены';
      case 'price-desc': return 'по убыванию цены';
      default: return 'сортировка';
    }
  };

  const handleSelect = (sort: SortType) => {
    setCurrentSort(sort);
    onSortChange(sort);
    setIsOpen(false);
  };

  const arrowIcon = theme === 'dark' ? arrowDark : arrowLight;

  return (
    <div className={styles.sortWrapper}>
      <button 
        className={`${styles.sortButton} ${theme === 'dark' ? styles.sortButtonDark : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${styles.text} ${theme === 'dark' ? styles.textDark : ''}`}>
          {getButtonText()}
        </span>
        <img 
          src={arrowIcon} 
          alt="arrow" 
          className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}
        />
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownItem} onClick={() => handleSelect('name-asc')}>
            от A до Я
          </div>
          <div className={styles.dropdownItem} onClick={() => handleSelect('name-desc')}>
            от Я до A
          </div>
          <div className={styles.dropdownItem} onClick={() => handleSelect('price-asc')}>
            по возрастанию цены
          </div>
          <div className={styles.dropdownItem} onClick={() => handleSelect('price-desc')}>
            по убыванию цены
          </div>
        </div>
      )}
    </div>
  );
};