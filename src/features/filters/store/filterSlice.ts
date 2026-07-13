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

  // селекторы

  selectors: {
    selectType: (state) => state.type,
    selectCategories: (state) => state.categories,
    selectGender: (state) => state.gender,
    selectCity: (state) => state.city,
    selectSearchQuery: (state) => state.searchQuery,
    selectSort: (state) => state.sort,
    selectAll: (state) => state,
    selectActiveFiltersCount: (state) => {
      let count = 0
      if (state.type !== 'all') count++
      if (state.categories.length > 0) count++
      if (state.gender !== 'any') count++
      if (state.city) count++
      return count
    },
    selectHasActiveFilters: (state) => {
      return (
        state.type !== 'all' ||
        state.categories.length > 0 ||
        state.gender !== 'any' ||
        !!state.city
      )
    },
    selectFilterState: (state) => ({
      type: state.type,
      categories: state.categories,
      gender: state.gender,
      city: state.city,
      searchQuery: state.searchQuery,
      sort: state.sort,
      activeFiltersCount:
        (state.type !== 'all' ? 1 : 0) +
        (state.categories.length > 0 ? 1 : 0) +
        (state.gender !== 'any' ? 1 : 0) +
        (state.city ? 1 : 0),
    }),
  },
})

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

export const {
  selectType,
  selectCategories,
  selectGender,
  selectCity,
  selectSearchQuery,
  selectSort,
  selectAll,
  selectActiveFiltersCount,
  selectHasActiveFilters,
  selectFilterState,
} = filterSlice.selectors

export default filterSlice.reducer
