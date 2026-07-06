import styles from './Footer.module.css';
import { Logo } from '@/shared/ui/logo';
import { ROUTES } from '@/shared/lib/constants.ts'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a className={styles.logo} href={ROUTES.HOME}>
        <Logo />
      </a>
      <ul className={styles.links}>
        <a href="#" className={styles.link}>
          О проекте
        </a>
        <a href="#" className={styles.link}>
          Контакты
        </a>
        <a href="#" className={styles.link}>
          Политика конфиденциальности
        </a>
        <a href="#" className={styles.link}>
          Все навыки
        </a>
        <a href="#" className={styles.link}>
          Блог
        </a>
        <a href="#" className={styles.link}>
          Пользовательское соглашение
        </a>
      </ul>
      <span className={styles.caption}>SkillSwap - 2026</span>
    </footer>
  )
};
