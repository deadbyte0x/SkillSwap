import { MoonIcon, SunIcon } from '../icons'
import styles from './ThemeButton.module.css'
import clsx from 'clsx'

interface ThemeButtonProps {
  isDark: boolean
  onClick: () => void
}

const ThemeButton = ({ isDark, onClick }: ThemeButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(styles.button, isDark ? styles.active : '')}
      onClick={onClick}
      aria-label={isDark ? 'Светлая тема' : 'Тёмная тема'}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

export default ThemeButton
