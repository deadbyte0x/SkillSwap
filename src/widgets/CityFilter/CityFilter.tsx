import styles from './CityFilter.module.css';
import { CheckBox } from '../../shared/ui/CheckBox';
import { ChevronDownIcon, ChevronUpIcon } from '../../shared/ui/icons';
import { Cities } from '@/shared/lib/constants.ts'

interface CityFilterProps {
  value: string[]
  isShowAll: boolean
  onShowAllClick: () => void
  onCityChange: (cityId: string) => void; // колбэк при выборе города
}

export const CityFilter = ({ value, isShowAll, onShowAllClick, onCityChange }: CityFilterProps) => {
  // показываем первые 6 или все
  const visibleCity = isShowAll ? Cities : Cities.slice(0, 6);

  return (
    <div className={styles.filter}>
      <h3 className={styles.title}>Город</h3>
      {visibleCity.map(city => (
        <div key={city} className={styles.cityRow}>
          {/* чекбокс активен если город в списке выбранных */}
          <CheckBox
            isActive={value.includes(city)}
            type="check"
            onClick={() => onCityChange(city)}
          />
          <span>{city}</span>
        </div>
      ))}
      {/* кнопка показать все города */}
      <button onClick={onShowAllClick}>
        Все города {isShowAll ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>
    </div>
  );
};
