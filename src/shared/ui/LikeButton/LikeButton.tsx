import { useState } from 'react'
import SvgLike from '../icons/LikeIcon'
import SvgLikeFilled from '../icons/LikeIconFilled'
import styles from './LikeButton.module.css'

interface LikeButtonProps {
  defaultActive?: boolean
  onChange?: (active: boolean) => void
}

export const LikeButton = ({ defaultActive = false, onChange }: LikeButtonProps) => {
  const [isActive, setIsActive] = useState(defaultActive)

  const handleClick = () => {
    const next = !isActive
    setIsActive(next)
    onChange?.(next)
  }

  const Icon = isActive ? SvgLikeFilled : SvgLike

  return (
    <button
      className={styles.button}
      onClick={handleClick}
      aria-label={isActive ? 'Убрать из избранного' : 'Добавить в избранное'}
      aria-pressed={isActive}
    >
      <Icon className={styles.icon}
      style={isActive ? { color: 'var(--color-accent)' } : undefined}
      />
    </button>
  )
}