import React from "react";
import styles from "./addbtn.module.css";

interface AddToCartButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  onClick, 
  disabled = false 
}) => {
  return (
    <button 
      className={styles.button} 
      onClick={onClick}
      disabled={disabled}
    >
      В корзину
    </button>
  );
};