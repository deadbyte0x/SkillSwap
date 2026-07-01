import SvgNotification from '../icons/NotificationIcon';
import styles from './NotificationBell.module.css';

interface NotificationBellProps {
  isActive: boolean;
  onClick: () => void; // функция при нажатии
}

export const NotificationBell= ({ isActive, onClick }: NotificationBellProps) => {
  return (
    <button onClick={onClick}>
      <span className={styles.wrapper}>
        <SvgNotification />
        {isActive ? <span className={styles.dot} /> : null}
      </span>
    </button>
  );
};
