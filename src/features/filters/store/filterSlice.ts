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

const countActiveFilters = (state: FilterState) =>
  (state.type !== 'all' ? 1 : 0) +
  (state.categories.length > 0 ? 1 : 0) +
  (state.gender !== 'any' ? 1 : 0) +
  (state.city ? 1 : 0)



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
    selectAllFilters: (state) => state,
    selectActiveFiltersCount: (state) => countActiveFilters(state),
    selectHasActiveFilters: (state) => {
      return countActiveFilters(state) > 0
    },
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
  selectAllFilters,
  selectActiveFiltersCount,
  selectHasActiveFilters,
} = filterSlice.selectors

export default filterSlice.reducer
