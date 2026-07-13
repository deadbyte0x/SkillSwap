import { describe, it, expect } from 'vitest'
import filterReducer, {
  setType,
  toggleCategory,
  clearCategories,
  setGender,
  setCity,
  setSearchQuery,
  setSort,
  resetFilters,
  selectActiveFiltersCount,
} from './filterSlice'
import type { FilterState } from './filterSlice'

describe('filterSlice', () => {
  const init: FilterState = {
    type: 'all',
    categories: [],
    gender: 'any',
    city: null,
    searchQuery: '',
    sort: 'popular',
  }

  it('возвращает начальное состояние', () => {
    expect(filterReducer(undefined, { type: 'unknown' })).toEqual(init)
  })

  it('устанавливает тип', () => {
    expect(filterReducer(init, setType('learn')).type).toBe('learn')
  })

  it('добавляет/удаляет категорию', () => {
    let s = filterReducer(init, toggleCategory('React'))
    expect(s.categories).toContain('React')
    s = filterReducer(s, toggleCategory('React'))
    expect(s.categories).not.toContain('React')
  })

  it('очищает категории', () => {
    let s = filterReducer(init, toggleCategory('React'))
    s = filterReducer(s, toggleCategory('TypeScript'))
    s = filterReducer(s, clearCategories())
    expect(s.categories).toEqual([])
  })

  it('устанавливает пол', () => {
    expect(filterReducer(init, setGender('female')).gender).toBe('female')
  })

  it('устанавливает город', () => {
    expect(filterReducer(init, setCity('Москва')).city).toBe('Москва')
  })

  it('устанавливает поиск', () => {
    expect(filterReducer(init, setSearchQuery('React')).searchQuery).toBe('React')
  })

  it('устанавливает сортировку', () => {
    expect(filterReducer(init, setSort('newest')).sort).toBe('newest')
  })

  it('сбрасывает фильтры', () => {
    let s = filterReducer(init, setType('teach'))
    s = filterReducer(s, setGender('male'))
    s = filterReducer(s, setCity('Москва'))
    s = filterReducer(s, resetFilters())
    expect(s).toEqual(init)
  })

  it('считает активные фильтры', () => {
    const state: { filters: FilterState } = { filters: init }
    expect(selectActiveFiltersCount(state)).toBe(0)
    const state2: { filters: FilterState } = {
      filters: { ...init, type: 'learn', gender: 'female', city: 'Москва' },
    }
    expect(selectActiveFiltersCount(state2)).toBe(3)
  })
})
