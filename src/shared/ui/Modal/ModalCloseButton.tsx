import styles from './ModalContent.module.css';
import { CrossIcon } from '@/shared/ui/icons';

interface ModalCloseButtonProps {
  onClick: () => void;
}

export const ModalCloseButton = ({ onClick }: ModalCloseButtonProps) => {
  return (
    <button type="button" className={styles.closeButton} onClick={onClick} aria-label="Закрыть">
      <CrossIcon width={24} height={24} />
    </button>
  )
};
