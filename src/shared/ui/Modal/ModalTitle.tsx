import { ReactNode } from 'react';
import styles from './ModalContent.module.css';

interface ModalTitleProps {
  children: ReactNode;
}

export const ModalTitle = ({ children }: ModalTitleProps) => {
  return <h2 className={styles.title}>{children}</h2>;
};