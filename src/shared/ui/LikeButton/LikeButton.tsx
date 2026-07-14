import { LikeIcon, LikeIconFilled } from '../icons'
import styles from './LikeButton.module.css'
import clsx from 'clsx'

interface LikeButtonProps {
  isActive: boolean
  onClick?: () => void
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
      <Icon className={clsx(styles.icon, isActive ? styles.iconActive : '')} />
    </button>
  )
}
