import styles from './Header.module.css';
import { Logo } from '../../shared/ui/logo';
import { Button } from '../../shared/ui/Button';
import SvgCross from '../../shared/ui/icons/CrossIcon';
import { ThemeButton } from '../../shared/ui/ThemeButton';
import { NotificationBell } from '../../shared/ui/NotificationBell';
import { LikeButton } from '../../shared/ui/LikeButton';
import { useRef, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@/shared/ui'
import { SkillsMenu } from '../SkillsMenu';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { useEscapeKey } from '@/shared/hooks/useEscapeKey';
import { ROUTES } from '@/shared/lib/constants.ts'
import { SearchInput } from '../../shared/ui/SearchInput';

interface HeaderProps {
  variant?: 'logged-out' | 'logged-in' | 'pure'; // вариант хэдера
  userName?: string; // имя пользователя
  userAvatar?: string; // аватар пользователя
}

export const Header = ({ variant = 'logged-out', userName, userAvatar }: HeaderProps) => {
  const [isSkillsOpened, setIsSkillsOpened] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  useClickOutside([menuRef, menuButtonRef], () => setIsSkillsOpened(false), isSkillsOpened)
  useEscapeKey(() => setIsSkillsOpened(false), isSkillsOpened)
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <a href={ROUTES.HOME}>
          <Logo />
        </a>
        {variant !== 'pure' && (
          <nav className={styles.nav}>
            <a href="#">О проекте</a>
            <button
              className={styles.navButton}
              type="button"
              onClick={() => setIsSkillsOpened(!isSkillsOpened)}
              ref={menuButtonRef}
            >
              <span>Все навыки</span>
              {isSkillsOpened ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>
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
