import styles from './CatalogWithFilter.module.css';
import { SkillFilter } from '../../widgets/SkillFilter';
import { CityFilter } from '../../widgets/CityFilter';
import { GenderFilter } from '../../widgets/GenderFilter';
import { SkillTypeFilter } from '../../widgets/SkillTypeFilter';
import { SUBCATEGORY_BY_ID } from '../../shared/lib/constants'
import { ReactNode, useCallback, useState } from 'react'
import { FilterState } from '@/shared/types'
import { toggleItem } from '@/shared/lib/helpers.ts'
import { CrossIcon } from '@/shared/ui'

type UIState = {
  showAllSkills: boolean,
  showAllCities: boolean,
  checkedCategories: string[]
}

const initialFilterState: FilterState = {
  type: 'all',
  subcategories: [],
  gender: 'any',
  cities: [],
  searchQuery: '',
  sort: 'popular',
}

const initialUIState: UIState = {
  showAllCities: false,
  showAllSkills: false,
  checkedCategories: [],
}

type CatalogWithFilterProps = {
  children: (filter: FilterState) => ReactNode;
}


export default function CatalogWithFilter({ children }: CatalogWithFilterProps) {

  const [filter, setFilter] = useState(initialFilterState);
  const [ui, setUi] = useState(initialUIState);

  const selectedFiltersCount = [
    filter.type !== 'all',
    filter.subcategories.length > 0,
    filter.gender !== 'any',
    filter.cities.length > 0,
    filter.searchQuery.length > 0,
  ].filter(Boolean).length


  const handleReset = () => {
    setFilter(initialFilterState);
    setUi(initialUIState);
  }

  const handleFilterChange = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setFilter({
        ...filter,
        [key]: value,
      })
    },
    [filter],
  )

  const handleUIChange = useCallback(
    <K extends keyof UIState>(key: K) => {
      setUi({
        ...ui,
        [key]: !ui[key],
      })
    },
    [ui],
  )

  const handleCityChange = (value: string)=> {
    const cities = toggleItem(filter.cities, value)
    setFilter({
      ...filter,
      cities: cities,
    })
  }

  const handleSubcategoryToggle = (value: string) => {
    const subcategories = toggleItem(filter.subcategories, value)
    const categories = subcategories.map((s) => SUBCATEGORY_BY_ID.get(s)?.categoryId ?? '').filter((c) => c !== '')
    const checkedCategories = [...new Set([...ui.checkedCategories, ...categories])]
    setFilter({
      ...filter,
      subcategories: subcategories,
    })
    setUi({
      ...ui,
      checkedCategories: checkedCategories,
    })
  }

  const handleCategoryToggle = (value: string) => {
    const categories = toggleItem(ui.checkedCategories, value)
    const subcategories = filter.subcategories.filter((s) =>
      categories.includes(SUBCATEGORY_BY_ID.get(s)?.categoryId ?? ''),
    )
    setFilter({
      ...filter,
      subcategories: subcategories
    })
    setUi({
      ...ui,
      checkedCategories: categories
    })
  }

  return (
    <div className={styles.page}>
      {/* боковая панель с фильтрами */}
      <aside className={styles.filters}>
        <div className={styles.title}>
          <h2
            className={styles.filtersTitle}
          >{`Фильтры${selectedFiltersCount > 0 ? ` (${selectedFiltersCount})` : ''}`}</h2>
          {selectedFiltersCount > 0 && (
            <button type="button" className={styles.clearButton} onClick={handleReset}>
              <span>Сбросить</span>
              <CrossIcon />
            </button>
          )}
        </div>
        <SkillTypeFilter
          value={filter.type}
          onChange={(value) => {
            handleFilterChange('type', value)
          }}
        />
        <SkillFilter
          selectedCategories={ui.checkedCategories}
          selectedSubcategories={filter.subcategories}
          isShowAll={ui.showAllSkills}
          onShowAllClick={() => handleUIChange('showAllSkills')}
          onCategoryChange={handleCategoryToggle}
          onSubcategoryChange={handleSubcategoryToggle}
        />
        <GenderFilter
          value={filter.gender}
          onChange={(value) => handleFilterChange('gender', value)}
        />
        <CityFilter
          value={filter.cities}
          isShowAll={ui.showAllCities}
          onShowAllClick={() => handleUIChange('showAllCities')}
          onCityChange={handleCityChange}
        />
      </aside>

      <main className={styles.content}>{children(filter)}</main>
    </div>
  )
}
