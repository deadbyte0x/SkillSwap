import type { TeachSkill } from '@/shared/types'
import { SUBCATEGORY_BY_ID, CATEGORY_BY_ID } from '@/shared/lib/constants'
import styles from './SkillInfo.module.css'

interface SkillInfoProps {
  skill: TeachSkill
}
export function SkillInfo({ skill }: SkillInfoProps) {
  // Ищем подкатегорию по id за O(1) через готовую Map из shared/constants
  const subCategory = SUBCATEGORY_BY_ID.get(skill.subCategoryId)

  // У подкатегории есть обратная ссылка categoryId — резолвим родительскую категорию
  const category = subCategory?.categoryId
    ? CATEGORY_BY_ID.get(subCategory.categoryId)
    : undefined

  // Фолбэк на случай невалидного/устаревшего subCategoryId в данных
  const breadcrumb =
    category && subCategory ? `${category.name} / ${subCategory.name}` : 'Без категории'

  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        <h1 className={styles.title}>{skill.title}</h1>
        <span className={styles.breadcrumb}>{breadcrumb}</span>
      </div>

      <p className={styles.description}>{skill.description}</p>
    </div>
  )
}