import { useRef } from 'react'
import type { TeachSkill, User } from '@/shared/types'
import { UserCard } from '@/shared/ui/UserCard'
import { Button } from '@/shared/ui/Button'
import { ChevronRightIcon } from '@/shared/ui'
import { useColumnsCount } from '@/shared/hooks/useColumnsCount'
import styles from './UserCardsSection.module.css'

interface UserCardsSectionProps {
  title: string
  users: User[]
  skills: TeachSkill[]
  showSeeAllButton?: boolean
  onSeeAllClick?: () => void
  singleRow?: boolean // показать ровно 1 ряд ("Популярное"/"Новое")
  fillFullRows?: boolean // обрезать по полным рядам (без хвоста)
  maxRows?: number // ограничить сверху N рядами (для "Рекомендуем" = 3)
}

export const UserCardsSection = ({
  title,
  users,
  skills,
  showSeeAllButton = false,
  onSeeAllClick,
  singleRow = false,
  fillFullRows = false,
  maxRows,
}: UserCardsSectionProps) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const columns = useColumnsCount(gridRef)

  let visibleUsers = users

  if (singleRow) {
    visibleUsers = users.slice(0, columns)
  } else if (fillFullRows) {
    let fullRowsCount = Math.floor(users.length / columns) * columns
    fullRowsCount = fullRowsCount || Math.min(columns, users.length)

    // Если задан maxRows — не даём вылезти больше, чем на maxRows рядов,
    // даже если данных хватило бы на больше полных рядов
    if (maxRows) {
      const capped = Math.min(fullRowsCount, columns * maxRows)
      visibleUsers = users.slice(0, capped)
    } else {
      visibleUsers = users.slice(0, fullRowsCount)
    }
  }

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

      <div className={styles.grid} ref={gridRef}>
        {visibleUsers.map((user) => {
          const skill = skills.find((item) => item.id === user.teachSkillId)
          if (!skill) return null

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
