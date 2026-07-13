import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//типы

export type FilterType = 'all' | 'learn' | 'teach'
export type GenderFilter = 'any' | 'male' | 'female'
export type SortOption = 'popular' | 'newest' | 'rating'

export interface FilterState {
  type: FilterType
  categories: string[]
  gender: GenderFilter
  city: string | null
  searchQuery: string
  sort: SortOption
}

// начальное состояние

const initialState: FilterState = {
  type: 'all',
  categories: [],
  gender: 'any',
  city: null,
  searchQuery: '',
  sort: 'popular',
}

// слайс

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<FilterType>) => {
      state.type = action.payload
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      const index = state.categories.indexOf(action.payload)
      if (index === -1) {
        state.categories.push(action.payload)
      } else {
        state.categories.splice(index, 1)
      }
    },
    clearCategories: (state) => {
      state.categories = []
    },
    setGender: (state, action: PayloadAction<GenderFilter>) => {
      state.gender = action.payload
    },
    setCity: (state, action: PayloadAction<string | null>) => {
      state.city = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setSort: (state, action: PayloadAction<SortOption>) => {
      state.sort = action.payload
    },
    resetFilters: (state) => {
      state.type = 'all'
      state.categories = []
      state.gender = 'any'
      state.city = null
      state.searchQuery = ''
      state.sort = 'popular'
    },
  },
})

// селекторы

export const selectActiveFiltersCount = (state: { filters: FilterState }): number => {
  let count = 0
  const { filters } = state
  if (filters.type !== 'all') count++
  if (filters.categories.length > 0) count++
  if (filters.gender !== 'any') count++
  if (filters.city) count++
  return count
}

export const {
  setType,
  toggleCategory,
  clearCategories,
  setGender,
  setCity,
  setSearchQuery,
  setSort,
  resetFilters,
} = filterSlice.actions

export default filterSlice.reducer
