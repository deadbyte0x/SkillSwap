import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import styles from './CatalogPage.module.css'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import { SkillFilter } from '@/widgets/SkillFilter'
import { CityFilter } from '@/widgets/CityFilter'
import { GenderFilter } from '@/widgets/GenderFilter'
import { SkillTypeFilter } from '@/widgets/SkillTypeFilter'
import { SKILL_CATEGORIES, Cities } from '@/shared/lib/constants'
import {
  loadAllData,
  getAllSkills,
  getAllUsers,
  getUsersPopular,
  getUsersNewest,
  getUsersRecommended,
} from '@/features/data'
import { UserCardsSection } from '@/widgets/UserCardsSection'
import {
  selectType,
  setType,
  toggleCategory,
  selectCategories,
  setGender,
  setCity,
  selectCity,
  selectGender,
} from '@/features/filters'
import type { User } from '@/shared/types'

export default function CatalogPage() {
  const dispatch = useAppDispatch()

  const skills = useAppSelector(getAllSkills)
  const selectedType = useAppSelector(selectType)
  const selectedCategories = useAppSelector(selectCategories)
  const selectedGender = useAppSelector(selectGender)
  const selectedCity = useAppSelector(selectCity)
  const allUsers = useAppSelector(getAllUsers)

  // Берём с запасом (allUsers.length), а не фиксированное число:
  // после filterUsers список ещё урежется фильтрами, а сама обрезка
  // под ширину экрана/число рядов происходит внутри UserCardsSection.
  // Если тут взять мало карточек — на широком экране может не хватить
  // данных, чтобы заполнить ряд/несколько рядов.
  const allPopularUsers = useAppSelector((state) => getUsersPopular(state, allUsers.length, 0))
  const allNewestUsers = useAppSelector((state) => getUsersNewest(state, allUsers.length, 0))
  const allRecommendedUsers = useAppSelector((state) =>
    getUsersRecommended(state, allUsers.length, 0),
  )

  useEffect(() => {
    dispatch(loadAllData())
  }, [dispatch])

  // Применяет выбранные в сайдбаре фильтры (тип навыка, категории,
  // пол, город) к переданному списку пользователей
  const filterUsers = (users: User[]) => {
    return users.filter((user) => {
      const teachSkill = skills.find((skill) => skill.id === user.teachSkillId)

      // Фильтр "чему может научить" — у юзера должен быть навык преподавания
      if (selectedType === 'teach' && !teachSkill) {
        return false
      }

      // Фильтр "хочет научиться" — у юзера должны быть категории для изучения
      if (selectedType === 'learn' && user.learnSubcategoryIds.length === 0) {
        return false
      }

      // Фильтр по выбранным категориям/подкатегориям навыков
      if (selectedCategories.length > 0) {
        const hasTeachSkill = teachSkill && selectedCategories.includes(teachSkill.subCategoryId)
        const hasLearnSkill = user.learnSubcategoryIds.some((id) => selectedCategories.includes(id))

        // В режиме "может научить" — смотрим только на преподаваемый навык
        if (selectedType === 'teach' && !hasTeachSkill) {
          return false
        }

        // В режиме "хочет научиться" — смотрим только на изучаемые категории
        if (selectedType === 'learn' && !hasLearnSkill) {
          return false
        }

        // В режиме "все" — подходит, если совпадает хотя бы одно из двух
        if (selectedType === 'all' && !hasTeachSkill && !hasLearnSkill) {
          return false
        }
      }

      // Фильтр по полу автора
      if (selectedGender !== 'any' && user.sex !== selectedGender) {
        return false
      }

      // Фильтр по городу
      if (selectedCity && user.city !== selectedCity) {
        return false
      }

      return true
    })
  }

  // Финальные списки для каждой секции — уже отфильтрованные.
  // Обрезку до нужного числа карточек (1 ряд для popular/newest,
  // максимум 3 полных ряда для recommended) делает сам
  // UserCardsSection через пропсы singleRow / fillFullRows / maxRows
  const popularUsers = filterUsers(allPopularUsers)
  const newestUsers = filterUsers(allNewestUsers)
  const recommendedUsers = filterUsers(allRecommendedUsers)

  return (
    <>
      <Header />
      <div className={styles.page}>
        {/* Боковая панель с фильтрами каталога */}
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
              // toggleCategory сам решает — добавить или убрать id из списка
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
          {/* Один ряд карточек, число зависит от ширины экрана (singleRow) */}
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

          {/* Показываем только полные ряды (без рваного хвоста),
              но не больше 3 рядов (maxRows) */}
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
