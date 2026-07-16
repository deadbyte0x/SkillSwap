import React from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; // текст или иконка внутри кнопки
  variant?: 'primary' | 'secondary' | 'tertiary'; // тип кнопки
  disabled?: boolean; // отключена ли кнопка
  iconLeft?: React.ReactNode; // иконка слева от текста
  iconRight?: React.ReactNode; // иконка справа от текста
  className?: string; // дополнительный класс для кастомизации снаружи (например, ширина)
}

export const Button = ({
  children, // текст внутри кнопки
  variant = 'primary', // тип кнопки, если не передали - primary
  disabled = false, // если не передали - кнопка активна
  iconLeft, // иконка слева
  iconRight, // иконка справа
  className, // внешний класс, добавляется последним, чтобы можно было переопределить стили
  type = 'button', // по умолчанию обычная кнопка, но теперь можно передать submit/reset
  ...props // остальные нативные props кнопки (onClick, aria-атрибуты и т.д.)
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(styles.button, styles[variant], className ?? '')} // берем класс button, variant и внешний className
      disabled={disabled}
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
};
