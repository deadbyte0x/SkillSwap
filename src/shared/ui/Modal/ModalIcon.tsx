import { ReactNode } from 'react';
import styles from './ModalContent.module.css';

interface ModalIconProps {
  children: ReactNode;
}

export const ModalIcon = ({ children }: ModalIconProps) => {
  return <div className={styles.iconWrapper}>{children}</div>;
};