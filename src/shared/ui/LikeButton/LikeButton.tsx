import { LikeIcon, LikeIconFilled } from '../icons'
import styles from './LikeButton.module.css'

interface LikeButtonProps {
  isActive: boolean
  onClick: () => void
}

export const LikeButton = ({ isActive, onClick }: LikeButtonProps) => {
  const Icon = isActive ? LikeIconFilled : LikeIcon

  return (
    <button
      className={styles.button}
      onClick={onClick}
      aria-label={isActive ? 'Убрать из избранного' : 'Добавить в избранное'}
      aria-pressed={isActive}
    >
      <Icon className={`${styles.icon} ${isActive ? styles.iconActive : ''}`} />
    </button>
  )
}