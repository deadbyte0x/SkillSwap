import { MouseEvent, ReactNode, useEffect } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  onModalClose: () => void;
  // Управляет размером белого контейнера: 'default' — узкая модалка-уведомление,
  // 'medium' — средняя модалка с отступом gap между блоками,
  // 'wide' — широкая модалка с дополнительным контентом (например, галереей).
  size?: 'default' | 'medium' | 'wide';
}

const CONTAINER_CLASS_BY_SIZE = {
  default: styles.container,
  medium: styles.containerMedium,
  wide: styles.containerWide,
} as const;

export const Modal = ({ children, onModalClose, size = 'default' }: ModalProps) => {
  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onModalClose();
    }
  };

  // Глобальный слушатель клавиатуры для закрытия по Escape.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onModalClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);

  // Блокировка скролла body на время открытой модалки.
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const containerClassName = CONTAINER_CLASS_BY_SIZE[size];

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={containerClassName}>{children}</div>
    </div>
  );
};