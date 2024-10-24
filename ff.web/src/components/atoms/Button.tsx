import { Button as AntDButton } from "antd-mobile";
import React from "react";
import styles from "./Button.module.scss"; // Import SCSS module

interface CustomButtonProps {
  color?: "primary" | "secondary"; // Custom variants
  variant?: "large" | "heavy" | "medium" | "small"; // Custom sizes
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

// eslint-disable-next-line react/function-component-definition
const Button: React.FC<CustomButtonProps> = ({
  variant = "large", // Default variant
  color = "primary", // Default color
  disabled = false, // New disabled prop with default value
  onClick,
  children,
}) => {
  const buttonClass = `${styles[variant]} ${styles[color]}`; // Use SCSS module

  return (
    <AntDButton className={buttonClass} onClick={onClick} disabled={disabled}>
      {children}
    </AntDButton>
  );
};

export default Button;

// import { Button } from "antd-mobile";
// export default Button;
