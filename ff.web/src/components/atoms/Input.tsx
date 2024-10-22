import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

function Input({ type = 'text', value, placeholder, onChange, className }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`${styles.input} ${className || ''}`}
    />
  );
}

export default Input;
