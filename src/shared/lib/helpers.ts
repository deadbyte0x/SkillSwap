import { FilterState, TeachSkill, User } from '@/shared/types'

/** Форматирует дату в читаемый вид */
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}

/** Обрезает строку до maxLength символов */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '...'
}

/** Генерирует уникальный id */
export function generateId(): string {
  return crypto.randomUUID()
}

// возвращает правильное слово: год/года/лет
export const getAgeWord = (age: number): string => {
  const lastTwo = age % 100
  const lastOne = age % 10
  if (lastTwo >= 11 && lastTwo <= 14) return 'лет'
  if (lastOne === 1) return 'год'
  if (lastOne >= 2 && lastOne <= 4) return 'года'
  return 'лет'
}

// Возвращает пользователей, подходящих под выбранные фильтры
export const filterUsers = (users: User[], skills: TeachSkill[], filter: FilterState) => {
  const selectedType = filter.type
  const selectedCategories = filter.subcategories
  const selectedGender = filter.gender
  const selectedCities = filter.cities
  return users.filter((user) => {
    const teachSkill = skills.find((skill) => skill.id === user.teachSkillId)

    // Фильтр по типу навыка
    if (selectedType === 'teach' && !teachSkill) {
      return false
    }

    if (selectedType === 'learn' && user.learnSubcategoryIds.length === 0) {
      return false
    }

    // Фильтр по выбранным навыкам
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

    // Фильтр по полу
    if (selectedGender !== 'any' && user.sex !== selectedGender) {
      return false
    }

    // Фильтр по городу
    if (selectedCities.length > 0 && !selectedCities.includes(user.city)) {
      return false
    }

    return true
  })
}

export function toggleItem<T>(items: T[], item: T): T[] {
  return items.includes(item) ? items.filter((i) => i !== item) : [...items, item]
}
