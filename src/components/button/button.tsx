import React from "react";
import styles from "./button.module.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  width?: number | string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  text, 
  onClick, 
  type = "button",
  disabled = false,
  width = 388, 
  className = ""
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={{ width: typeof width === 'number' ? `${width}px` : width }}
    >
      {text}
    </button>
  );
};