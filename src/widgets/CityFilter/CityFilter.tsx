import { useState } from 'react';
import styles from './CityFilter.module.css';
import { CheckBox } from '../../shared/ui/CheckBox';
import { ChevronDownIcon, ChevronUpIcon } from '../../shared/ui/icons';

interface City {
  id: string;
  name: string;
}

interface CityFilterProps {
  cities: City[]; // список городов
  onCityChange: (cityId: string | null) => void; // колбэк при выборе города
}

export const CityFilter = ({ cities, onCityChange }: CityFilterProps) => {
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null); // выбранный город
  const [showAll, setShowAll] = useState(false); // показывать все или 6

  // при клике: если город уже выбран — убираем, если нет — добавляем
  const handleCityClick = (cityId: string) => {
  const newValue = selectedCityId === cityId ? null : cityId;

    setSelectedCityId(newValue);
    onCityChange(newValue);
  };

  // показываем первые 6 или все
  const visibleCity = showAll ? cities : cities.slice(0, 6);

  return (
    <div className={styles.filter}>
      <h3 className={styles.title}>Город</h3>
      {visibleCity.map(city => (
        <div key={city.id} className={styles.cityRow}>
          {/* чекбокс активен если город в списке выбранных */}
          <CheckBox
            isActive={selectedCityId === city.id}
            type="check"
            onClick={() => handleCityClick(city.id)}
          />
          <span>{city.name}</span>
        </div>
      ))}
      {/* кнопка показать все города */}
      <button onClick={() => setShowAll(!showAll)} className={styles.showAllButton}>
        Все города {showAll ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>
    </div>
  );
};
