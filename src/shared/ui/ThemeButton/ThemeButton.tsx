import { MoonIcon, MoonIconFilled } from '../icons'
import styles from './ThemeButton.module.css'

interface ThemeButtonProps {
  isDark: boolean
  onClick: () => void
}

const ThemeButton = ({ isDark, onClick }: ThemeButtonProps) => {
  return (
    <button
      className={`${styles.button} ${isDark ? styles.active : ''}`}
      onClick={onClick}
      aria-label={isDark ? 'Светлая тема' : 'Тёмная тема'}
    >
      {isDark ? <MoonIconFilled /> : <MoonIcon />}
    </button>
  )
}

export default ThemeButton