import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode; // текст или иконка внутри кнопки
  variant?: 'primary' | 'secondary' | 'tertiary'; // тип кнопки
  disabled?: boolean; // отключена ли кнопка
  iconLeft?: React.ReactNode; // иконка слева от текста
  iconRight?: React.ReactNode; // иконка справа от текста
}

export const Button = ({
  children, // текст внутри кнопки
  variant = 'primary', // тип кнопки, если не передали - primary
  disabled = false, // если не передали - кнопка активна
  iconLeft, // иконка слева
  iconRight, // иконка справа
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`} // берем класс button и один из variant
      disabled={disabled}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
};
