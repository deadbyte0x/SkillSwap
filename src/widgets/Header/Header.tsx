import styles from './Header.module.css';
import { Logo } from '../../shared/ui/logo';
import { Button } from '../../shared/ui/Button';
import SvgCross from '../../shared/ui/icons/CrossIcon';
import { ThemeButton } from '../../shared/ui/ThemeButton';
// import { NotificationBell } from '../../shared/ui/NotificationBell';
import { LikeButton } from '../../shared/ui/LikeButton';
import { useState } from 'react';
import { ChevronDownIcon } from '@/shared/ui';
import { SkillsMenu } from '../SkillsMenu';

interface HeaderProps {
  variant?: 'logged-out' | 'logged-in' | 'pure'; // вариант хэдера
  userName?: string; // имя пользователя
  userAvatar?: string; // аватар пользователя
}

export const Header = ({ variant = 'logged-out', userName, userAvatar }: HeaderProps) => {
  const [isSkillsOpened, setIsSkillsOpened] = useState(false)
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Logo />
        {variant !== 'pure' && (
          <nav className={styles.nav}>
            <a href="#">О проекте</a>
            <button className={styles.skillsContainer} type='button' onClick={() => setIsSkillsOpened(!isSkillsOpened)}>
            <a href="#" onClick={(e) => e.preventDefault()}>Все навыки</a>
            <ChevronDownIcon/>
            </button>
          </nav>
        )}
      </div>
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
          {/* <NotificationBell isActive={false} onClick={() => {}} /> */}
          <LikeButton isActive={false} onClick={() => {}} />
          <span>{userName}</span>
          {userAvatar && <img src={userAvatar} alt={userName} />}
        </div>
      )}
      {isSkillsOpened && <SkillsMenu/>}
    </header>
  );
};
