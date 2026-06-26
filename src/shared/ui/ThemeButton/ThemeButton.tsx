import { useState } from 'react'
import MoonIcon from '../icons/MoonIcon'
import MoonIconFilled from '../icons/MoonIconFilled'
import styles from './ThemeButton.module.css'

interface ThemeButtonProps {
  onChange?: (isDark: boolean) => void
}

const ThemeButton = ({ onChange }: ThemeButtonProps) => {
  const [isDark, setIsDark] = useState(false)

  const handleClick = () => {
    const next = !isDark
    setIsDark(next)
    onChange?.(next)
  }

  return (
    <button
      className={`${styles.button} ${isDark ? styles.active : ''}`}
      onClick={handleClick}
      aria-label={isDark ? 'Светлая тема' : 'Тёмная тема'}
    >
      {isDark ? <MoonIconFilled /> : <MoonIcon />}
    </button>
  )
}

export default ThemeButton
