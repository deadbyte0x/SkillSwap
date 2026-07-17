import styles from './SkillFilter.module.css';
import { CheckBox } from '../../shared/ui/CheckBox';
import { ChevronDownIcon, ChevronUpIcon } from '../../shared/ui/icons';
import { SKILL_CATEGORIES } from '@/shared/lib/constants.ts'


// пропсы компонента
interface SkillFilterProps {
  selectedCategories: string[]
  selectedSubcategories: string[]
  isShowAll: boolean
  onShowAllClick: () => void
  onCategoryChange: (categoryId: string) => void; // колбэк при выборе категории
  onSubcategoryChange: (subcategoryId: string) => void; // колбэк при выборе подкатегории
}

export const SkillFilter = ({ selectedSubcategories, selectedCategories, isShowAll, onShowAllClick, onCategoryChange, onSubcategoryChange }: SkillFilterProps) => {
  // показываем первые 6 или все
  const visibleCategories = isShowAll ? SKILL_CATEGORIES : SKILL_CATEGORIES.slice(0, 6)

  return (
    <div className={styles.filter}>
      <h3 className={styles.title}>Навыки</h3>
      {visibleCategories.map((category) => (
        <div key={category.id}>
          {/* строка с чекбоксом и названием категории */}
          <div className={styles.categoryRow}>
            <CheckBox
              isActive={selectedCategories.includes(category.id)}
              type="minus"
              onClick={() => onCategoryChange(category.id)}
            />
            <span>{category.name}</span>
          </div>
          {/* подкатегории снизу */}
          {selectedCategories.includes(category.id) && (
            <div className={styles.subcategories}>
              {category.subCategories.map((sub) => (
                <div key={sub.id} className={styles.categoryRow}>
                  <CheckBox
                    isActive={selectedSubcategories.includes(sub.id)}
                    type="check"
                    onClick={() => onSubcategoryChange(sub.id)}
                  />
                  <span>{sub.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {/* кнопка показать все категории */}
      <button type="button" onClick={onShowAllClick}>
        Все категории {isShowAll ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>
    </div>
  )
};
