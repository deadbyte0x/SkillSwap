import type { TeachSkill, User } from '@/shared/types'
import { SUBCATEGORY_BY_ID } from '@/shared/lib/constants'
import { Avatar } from '@/shared/ui/avatar/Avatar.tsx'
import { Tag, type TagCategory } from '@/shared/ui/Tag/Tag.tsx'
import styles from './UserProfileCard.module.css'

interface UserProfileCardProps {
  user: User
  teachSkill: TeachSkill
}

const getTagCategory = (): TagCategory => 'plus'

export function UserProfileCard({ user, teachSkill }: UserProfileCardProps) {
  const learnLabels = user.learnSubcategoryIds
    .map((id) => SUBCATEGORY_BY_ID.get(id)?.name)
    .filter((label): label is string => Boolean(label))

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

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Может научить</h3>
        <div className={styles.tags}>
          <Tag category={getTagCategory()}>{teachSkill.title}</Tag>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Хочет научиться</h3>
        <div className={styles.tags}>
          {learnLabels.map((label) => (
            <Tag key={label} category={getTagCategory()}>
              {label}
            </Tag>
          ))}
        </div>
      </div>
    </aside>
  )
}
