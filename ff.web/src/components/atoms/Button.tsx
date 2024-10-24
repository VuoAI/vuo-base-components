import React from 'react';
import { Button as AntDButton } from 'antd-mobile';
import styles from './Button.module.scss'; // Import SCSS module

//TODO recreate antd mobile button with identical props

interface CustomButtonProps {
  color?: 'primary' | 'secondary'  // Custom variants
  variant?: 'large' | 'heavy' | 'medium' | 'small';  // Custom sizes
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
  className?: string; 
  disabled?: boolean
  style?: React.CSSProperties; // Add style prop
  block?: boolean;
}

// eslint-disable-next-line react/function-component-definition
const Button: React.FC<CustomButtonProps> = ({
  variant = 'large', // Default variant
  color = 'primary', // Default color
  className = "",
  onClick, 
  children,
  disabled = false,
  style
}) => {

  const buttonClass = `${styles[variant]} ${styles[color]} ${className}`; // Use SCSS module

  return (
    <AntDButton className={buttonClass} onClick={onClick} disabled={disabled} style={style}>
      {children}
    </AntDButton>
  );
};

export default Button;

// import { Button } from "antd-mobile";
// export default Button;
