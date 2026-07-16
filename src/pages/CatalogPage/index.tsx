import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import styles from './CatalogPage.module.css'
import { Header } from '../../widgets/Header'
import { Footer } from '../../widgets/Footer'
import { SkillFilter } from '../../widgets/SkillFilter'
import { CityFilter } from '../../widgets/CityFilter'
import { GenderFilter } from '../../widgets/GenderFilter'
import { SkillTypeFilter } from '../../widgets/SkillTypeFilter'
import { SKILL_CATEGORIES, Cities } from '../../shared/lib/constants'
import {
  loadAllData,
  getAllSkills,
  getAllUsers,
  getUsersPopular,
  getUsersNewest,
  getUsersRecommended,
} from '../../features/data'
import { UserCardsSection } from '../../widgets/UserCardsSection'
import {
  selectType,
  setType,
  toggleCategory,
  selectCategories,
  setGender,
  setCity,
  selectCity,
  selectGender,
} from '../../features/filters'
import type { User } from '../../shared/types'

export default function CatalogPage() {
  const dispatch = useAppDispatch()

  const skills = useAppSelector(getAllSkills)
  const selectedType = useAppSelector(selectType)
  const selectedCategories = useAppSelector(selectCategories)
  const selectedGender = useAppSelector(selectGender)
  const selectedCity = useAppSelector(selectCity)
  const allUsers = useAppSelector(getAllUsers)

  const allPopularUsers = useAppSelector((state) => getUsersPopular(state, allUsers.length, 0))
  const allNewestUsers = useAppSelector((state) => getUsersNewest(state, allUsers.length, 0))
  const allRecommendedUsers = useAppSelector((state) =>
    getUsersRecommended(state, allUsers.length, 0),
  )

  useEffect(() => {
    dispatch(loadAllData())
  }, [dispatch])

  // Возвращает пользователей, подходящих под выбранные фильтры
  const filterUsers = (users: User[]) => {
    return users.filter((user) => {
      const teachSkill = skills.find((skill) => skill.id === user.teachSkillId)

      if (selectedType === 'teach' && !teachSkill) {
        return false
      }

      if (selectedType === 'learn' && user.learnSubcategoryIds.length === 0) {
        return false
      }

      if (selectedCategories.length > 0) {
        const hasTeachSkill = teachSkill && selectedCategories.includes(teachSkill.subCategoryId)

        const hasLearnSkill = user.learnSubcategoryIds.some((id) => selectedCategories.includes(id))

        if (selectedType === 'teach' && !hasTeachSkill) {
          return false
        }

        if (selectedType === 'learn' && !hasLearnSkill) {
          return false
        }

        if (selectedType === 'all' && !hasTeachSkill && !hasLearnSkill) {
          return false
        }
      }

      if (selectedGender !== 'any' && user.sex !== selectedGender) {
        return false
      }

      if (selectedCity && user.city !== selectedCity) {
        return false
      }

      return true
    })
  }

  const popularUsers = filterUsers(allPopularUsers)
  const newestUsers = filterUsers(allNewestUsers)
  const recommendedUsers = filterUsers(allRecommendedUsers)

  return (
    <>
      <Header />
      <div className={styles.page}>
        <aside className={styles.filters}>
          <h2 className={styles.filtersTitle}>Фильтры</h2>
          <SkillTypeFilter
            onChange={(value) => {
              dispatch(setType(value))
            }}
          />
          <SkillFilter
            categories={SKILL_CATEGORIES}
            onCategoryChange={() => {}}
            onSubcategoryChange={(subcategoryId) => {
              dispatch(toggleCategory(subcategoryId))
            }}
          />
          <GenderFilter onChange={(value) => dispatch(setGender(value))} />
          <CityFilter
            cities={Cities.map((name) => ({
              id: name,
              name,
            }))}
            onCityChange={(city) => dispatch(setCity(city))}
          />
        </aside>

        <main className={styles.content}>
          <UserCardsSection
            title="Популярное"
            users={popularUsers}
            skills={skills}
            showSeeAllButton
            singleRow
            onSeeAllClick={() => {}}
          />

          <UserCardsSection
            title="Новое"
            users={newestUsers}
            skills={skills}
            showSeeAllButton
            singleRow
            onSeeAllClick={() => {}}
          />

          <UserCardsSection
            title="Рекомендуем"
            users={recommendedUsers}
            skills={skills}
            showSeeAllButton
            fillFullRows
            maxRows={3}
            onSeeAllClick={() => {}}
          />
        </main>
      </div>
      <Footer />
    </>
  )
}
