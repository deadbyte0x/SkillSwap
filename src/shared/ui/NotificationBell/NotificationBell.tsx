import SvgNotification from '../icons/NotificationIcon';
import styles from './NotificationBell.module.css';

interface NotificationBellProps {
  isActive: boolean;
  onClick: () => void; // функция при нажатии
}

export const NotificationBell= ({ isActive, onClick }: NotificationBellProps) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-label="Уведомления"
    >
      <div className={styles.wrapper}>
        <SvgNotification />
        {isActive ? <div className={styles.dot} /> : null}
      </div>
    </button>
  );
};
