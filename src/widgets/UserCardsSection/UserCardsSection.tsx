import type { TeachSkill, User } from '@/shared/types'
import { UserCard } from '@/shared/ui/UserCard'
import { Button } from '@/shared/ui/Button'
import { ChevronRightIcon } from '@/shared/ui'
import styles from './UserCardsSection.module.css'

interface UserCardsSectionProps {
  title: string
  users: User[]
  skills: TeachSkill[]
  showSeeAllButton?: boolean
  onSeeAllClick?: () => void
  showMoreButton?: boolean
  onShowMoreClick?: () => void
}

export const UserCardsSection = ({
  title,
  users,
  skills,
  showSeeAllButton = false,
  onSeeAllClick,
  showMoreButton = false,
  onShowMoreClick
}: UserCardsSectionProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>

        {showSeeAllButton && (
          <Button
            variant="tertiary"
            iconRight={<ChevronRightIcon />}
            className={styles.seeAllButton}
            onClick={onSeeAllClick}
          >
            Смотреть все
          </Button>
        )}
      </div>

      <div className={styles.grid}>
        {users.map((user) => {
          const skill = skills.find((item) => item.id === user.teachSkillId)
          if (!skill) return null;

          return (
            <UserCard
              key={user.id}
              user={user}
              teachSkill={skill}
            />
          )
        })}
      </div>
      {showMoreButton && (
        <Button variant={'tertiary'} className={styles.showMoreButton} onClick={onShowMoreClick} >
          Загрузить ещё
        </Button>
      )}
    </section>
  )
}
