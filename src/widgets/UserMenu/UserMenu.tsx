import { Link } from 'react-router-dom'
import styles from './UserMenu.module.css'
import { LogoutIcon } from '@/shared/ui'
import { forwardRef } from 'react'
import { ROUTES } from '@/shared/lib/constants.ts'
import { useAppDispatch } from '@/store/hooks.ts'
import { clearUser } from '@/features/auth'


export const UserMenu = forwardRef<HTMLDivElement>(( _props, ref) => {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(clearUser());
  }

  return (
    <div className={styles.menu} ref={ref}>
      <Link to={ROUTES.PROFILE} className={styles.link}>
        Личный кабинет
      </Link>
      <button type="button" onClick={handleLogout} className={styles.link}>
        <span>Выйти из аккаунта</span>
        <LogoutIcon />
      </button>
    </div>
  )
})

UserMenu.displayName = "UserMenu"
