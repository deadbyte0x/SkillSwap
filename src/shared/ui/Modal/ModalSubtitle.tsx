import { ReactNode } from 'react';
import styles from './ModalContent.module.css';

interface ModalSubtitleProps {
  children: ReactNode;
}

export const ModalSubtitle = ({ children }: ModalSubtitleProps) => {
  return <p className={styles.subtitle}>{children}</p>;
};