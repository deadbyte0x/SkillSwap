import { ReactNode } from 'react';
import { Button } from '@/shared/ui/Button';
import styles from './ModalContent.module.css';

interface ModalButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const ModalButton = ({ children, onClick, variant = 'primary' }: ModalButtonProps) => {
  return (
    <Button variant={variant} onClick={onClick} className={styles.buttonFullWidth}>
      {children}
    </Button>
  );
};