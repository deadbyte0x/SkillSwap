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
}

export const UserCardsSection = ({
  title,
  users,
  skills,
  showSeeAllButton = false,
  onSeeAllClick,
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
              teachSkill={{ title: skill.title, subCategoryId: skill.subCategoryId }}
              isLiked={false}
              onLike={() => {}}
              onDetailsClick={() => {}}
            />
          )
        })}
      </div>
    </section>
  )
}
