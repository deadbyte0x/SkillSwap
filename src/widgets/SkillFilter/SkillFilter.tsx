import { useState } from 'react';
import styles from './SkillFilter.module.css';
import { CheckBox } from '../../shared/ui/CheckBox';
import { ChevronDownIcon, ChevronUpIcon } from '../../shared/ui/icons';
import { Category } from '@/shared/types'


// пропсы компонента
interface SkillFilterProps {
  categories: Category[]; // список категорий
  onCategoryChange: (categoryId: string) => void; // колбэк при выборе категории
  onSubcategoryChange: (subcategoryId: string) => void; // колбэк при выборе подкатегории
}

export const SkillFilter = ({ categories, onCategoryChange, onSubcategoryChange }: SkillFilterProps) => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]); // какая категория открыта
  const [showAll, setShowAll] = useState(false); // показывать все категории или только 6
  const [selectedSubIds, setSelectedSubIds] = useState<string[]>([]); // выбранные подкатегории

  // открываем/закрываем подкатегории при клике на категорию
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id != categoryId) : [...prev, categoryId]
    )
    onCategoryChange(categoryId)
  }

  // переключаем выбор подкатегории
  const handleSubcategoryClick = (subId: string) => {
    setSelectedSubIds(prev =>
      prev.includes(subId) ? prev.filter(id => id !== subId) : [...prev, subId]
    );
    onSubcategoryChange(subId);
  };

  // показываем первые 6 или все
  const visibleCategories = showAll ? categories : categories.slice(0, 6);

  return (
    <div className={styles.filter}>
      <h3 className={styles.title}>Навыки</h3>
      {visibleCategories.map(category => (
        <div key={category.id}>
          {/* строка с чекбоксом и названием категории */}
          <div className={styles.categoryRow}>
            <CheckBox
              isActive={selectedCategoryIds.includes(category.id)}
              type='minus'
              onClick={() => handleCategoryClick(category.id)}
            />
            <span>{category.name}</span>
          </div>
          {/* подкатегории снизу */}
          {selectedCategoryIds.includes(category.id) && (
            <div className={styles.subcategories}>
              {category.subCategories.map(sub => (
                <div key={sub.id} className={styles.categoryRow}>
                  <CheckBox
                    isActive={selectedSubIds.includes(sub.id)}
                    type="check"
                    onClick={() => handleSubcategoryClick(sub.id)}
                  />
                  <span>{sub.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {/* кнопка показать все категории */}
      <button onClick={() => setShowAll(!showAll)} className={styles.showAllButton}>
        Все категории {showAll ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>
    </div>
  );
};
