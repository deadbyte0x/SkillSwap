import { useState, useRef, useCallback } from 'react';
import styles from './Header.module.css';
import { Logo } from '../../shared/ui/logo';
import { Button } from '../../shared/ui/Button';
import SvgCross from '../../shared/ui/icons/CrossIcon';
import { ThemeButton } from '../../shared/ui/ThemeButton';
import { NotificationBell } from '../../shared/ui/NotificationBell';
import { LikeButton } from '../../shared/ui/LikeButton';
import { SearchInput } from '../../shared/ui/SearchInput';
import { ChevronDownIcon, ChevronUpIcon } from '../../shared/ui/icons';
import { useClickOutside } from '../../shared/hooks/useClickOutside';
import { SkillsMenu } from '../SkillsMenu';

interface HeaderProps {
  variant?: 'logged-out' | 'logged-in' | 'pure'; // вариант хэдера
  userName?: string; // имя пользователя
  userAvatar?: string; // аватар пользователя
}

export const Header = ({ variant = 'logged-out', userName, userAvatar }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // закрываем меню при клике вне кнопки и вне меню
  useClickOutside(
    [buttonRef as React.RefObject<HTMLElement>, menuRef as React.RefObject<HTMLElement>],
    closeMenu,
    isMenuOpen,
  );

  return (
    <header className={styles.header}>
        <div className={styles.left}>
        <Logo />
        {variant !== 'pure' && (
          <nav className={styles.nav}>
            <a href="#">О проекте</a>
            <button
              ref={buttonRef}
              type="button"
              className={styles.navButton}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              Все навыки
              {isMenuOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>
          </nav>
        )}
      </div>

      {/* выпадающее меню навыков */}
      {isMenuOpen && <SkillsMenu ref={menuRef} />}

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
