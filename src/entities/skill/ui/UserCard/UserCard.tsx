import type { TeachSkill, User } from '@/shared/types'
import { SUBCATEGORY_BY_ID } from '@/shared/lib/constants'
import styles from './UserCard.module.css'

interface UserCardProps {
  user: User
  teachSkill: TeachSkill
}

export function UserCard({ user, teachSkill }: UserCardProps) {
  const learnLabels = user.learnSubcategoryIds
    .map((id) => SUBCATEGORY_BY_ID.get(id)?.name)
    .filter((label): label is string => Boolean(label))

  return (
    <aside className={styles.root}>
      <div className={styles.header}>
        <img
          className={styles.avatar}
          src={user.avatarUrl ?? '/images/avatar-placeholder.png'}
          alt={user.name}
        />

        <div className={styles.meta}>
          <h2 className={styles.name}>{user.name}</h2>
          <p className={styles.location}>
            {user.city}, {user.age} лет
          </p>
        </div>
      </div>

      <p className={styles.about}>{user.about}</p>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Может научить</h3>
        <div className={styles.tags}>
          <span className={styles.tag}>{teachSkill.title}</span>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Хочет научиться</h3>
        <div className={styles.tags}>
          {learnLabels.map((label) => (
            <span key={label} className={styles.tag}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </aside>
  )
}
