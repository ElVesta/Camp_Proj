import React from "react";
import styles from "./counter.module.css";

interface CounterProps {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minValue?: number;
}

export const Counter: React.FC<CounterProps> = ({ 
  value, 
  onIncrease, 
  onDecrease,
  minValue = 1 
}) => {
  return (
    <div className={styles.counter}>
      <button 
        className={styles.decreaseBtn}
        onClick={onDecrease}
        disabled={value <= minValue}
      >
        -
      </button>
      <div className={styles.divider} />
      <span className={styles.value}>{value}</span>
      <div className={styles.divider} />
      <button 
        className={styles.increaseBtn}
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  );
};