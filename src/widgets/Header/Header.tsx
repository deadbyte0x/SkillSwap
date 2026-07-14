import styles from './Header.module.css';
import { Logo } from '../../shared/ui/logo';
import { Button } from '../../shared/ui/Button';
import SvgCross from '../../shared/ui/icons/CrossIcon';
import { ThemeButton } from '../../shared/ui/ThemeButton';
import { NotificationBell } from '../../shared/ui/NotificationBell';
import { LikeButton } from '../../shared/ui/LikeButton';
import { SearchInput } from '../../shared/ui/SearchInput';

interface HeaderProps {
  variant?: 'logged-out' | 'logged-in' | 'pure'; // вариант хэдера
  userName?: string; // имя пользователя
  userAvatar?: string; // аватар пользователя
}

export const Header = ({ variant = 'logged-out', userName, userAvatar }: HeaderProps) => {
  return (
    <header className={styles.header}>
        <div className={styles.left}>
        <Logo />
        {variant !== 'pure' && (
          <nav className={styles.nav}>
            <a href="#">О проекте</a>
            <a href="#">Все навыки</a>
          </nav>
        )}
      </div>

      {/* поисковая строка */}
      {variant !== 'pure' && (
        <div className={styles.search}>
          <SearchInput onSearch={() => {}} />
        </div>
      )}
      {variant === 'pure' && (
        <Button variant="tertiary" iconRight={<SvgCross />} onClick={() => {}}>
          Закрыть
        </Button>
      )}
      {variant === 'logged-out' && (
        <div className={styles.actions}>
          <ThemeButton isDark={false} onClick={() => {}} />
          <Button variant="secondary" onClick={() => {}}>Войти</Button>
          <Button variant="primary" onClick={() => {}}>Зарегистрироваться</Button>
        </div>
      )}

      {variant === 'logged-in' && (
        <div className={styles.actions}>
          <ThemeButton isDark={false} onClick={() => {}} />
          <NotificationBell isActive={false} onClick={() => {}} />
          <LikeButton isActive={false} onClick={() => {}} />
          <span>{userName}</span>
          {userAvatar && <img src={userAvatar} alt={userName} />}
        </div>
      )}
      {isSkillsOpened && <SkillsMenu ref={menuRef} />}
    </header>
  )
};
