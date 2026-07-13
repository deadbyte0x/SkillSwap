import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  setType,
  toggleCategory,
  clearCategories,
  setGender,
  setCity,
  setSearchQuery,
  setSort,
  resetFilters,
  selectActiveFiltersCount,
} from '../store/filterSlice'
import type { FilterType, GenderFilter, SortOption } from '../store/filterSlice'

export const useFilters = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((s) => s.filters)
  const activeFiltersCount = useAppSelector(selectActiveFiltersCount)

  return {
    ...state,
    activeFiltersCount,
    setType: useCallback((type: FilterType) => dispatch(setType(type)), [dispatch]),
    toggleCategory: useCallback(
      (category: string) => dispatch(toggleCategory(category)),
      [dispatch],
    ),
    clearCategories: useCallback(() => dispatch(clearCategories()), [dispatch]),
    setGender: useCallback((gender: GenderFilter) => dispatch(setGender(gender)), [dispatch]),
    setCity: useCallback((city: string | null) => dispatch(setCity(city)), [dispatch]),
    setSearchQuery: useCallback((query: string) => dispatch(setSearchQuery(query)), [dispatch]),
    setSort: useCallback((sort: SortOption) => dispatch(setSort(sort)), [dispatch]),
    resetFilters: useCallback(() => dispatch(resetFilters()), [dispatch]),
  }
}
