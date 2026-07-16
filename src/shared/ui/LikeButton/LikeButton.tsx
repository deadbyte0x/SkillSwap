import { LikeIcon, LikeIconFilled } from '../icons'
import styles from './LikeButton.module.css'
import clsx from 'clsx'

interface LikeButtonProps {
  isActive: boolean
  onClick?: () => void
  count?: number
}

export const LikeButton = ({ isActive, onClick, count }: LikeButtonProps) => {
  const Icon = isActive ? LikeIconFilled : LikeIcon

  return (
    <button
      className={styles.button}
      onClick={onClick}
      aria-label={isActive ? 'Убрать из избранного' : 'Добавить в избранное'}
      aria-pressed={isActive}
    >
      <Icon className={clsx(styles.icon, isActive ? styles.iconActive : '')} />
      {count !== undefined && <span className={styles.count}>{count > 99 ? "99+" : count}</span>}
    </button>
  )
}
