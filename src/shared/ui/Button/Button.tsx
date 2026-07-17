import React from 'react';
import styles from './Button.module.css';
import clsx from 'clsx'

interface ButtonProps {
  children: React.ReactNode; // текст или иконка внутри кнопки
  variant?: 'primary' | 'secondary' | 'tertiary'; // тип кнопки
  disabled?: boolean; // отключена ли кнопка
  iconLeft?: React.ReactNode; // иконка слева от текста
  iconRight?: React.ReactNode; // иконка справа от текста
  onClick?: () => void; // функция при нажатии
  className?: string; // дополнительный класс для кастомизации снаружи (например, ширина)
  type?: 'button' | 'submit'
}

export const Button = ({
  children, // текст внутри кнопки
  variant = 'primary', // тип кнопки, если не передали - primary
  disabled = false, // если не передали - кнопка активна
  iconLeft, // иконка слева
  iconRight, // иконка справа
  onClick,
  className, // внешний класс, добавляется последним, чтобы можно было переопределить стили
  type = 'button'
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(styles.button, styles[variant], className ?? '')} // берем класс button, variant и внешний className
      disabled={disabled}
      onClick={onClick}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  )
};
