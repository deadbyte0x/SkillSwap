import type { TeachSkill, User } from '@/shared/types'
import { Avatar } from '@/shared/ui/avatar/Avatar.tsx'
import { UserTags } from '@/shared/ui/UserTags'
import styles from './UserProfileCard.module.css'

interface UserProfileCardProps {
  user: User
  teachSkill: TeachSkill
}

export function UserProfileCard({ user, teachSkill }: UserProfileCardProps) {
  return (
    <aside className={styles.root}>
      <div className={styles.header}>
        {user.avatarUrl ? (
          <Avatar image={user.avatarUrl} />
        ) : (
          <div className={styles.avatarFallback}>
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className={styles.meta}>
          <h2 className={styles.name}>{user.name}</h2>
          <p className={styles.location}>
            {user.city}, {user.age} лет
          </p>
        </div>
      </div>

      <p className={styles.about}>{user.about}</p>

      <UserTags user={user} teachSkill={teachSkill} />
    </aside>
  )
}
