import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { Skill } from '@/shared/types'

interface SearchState {
  query: string
  results: Skill[]
  loading: boolean
  error: string | null
}

const initialState: SearchState = {
  query: '',
  results: [],
  loading: false,
  error: null,
}

export const performSearch = createAsyncThunk(
  'search/performSearch',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await fetch('/db/skills.json')
      if (!response.ok) {
        throw new Error('Failed to fetch skills')
      }
      const skills: Skill[] = await response.json()

      const searchTerm = query.toLowerCase().trim()
      const filtered = skills.filter((skill) => {
        const titleMatch = skill.title.toLowerCase().includes(searchTerm)
        const categoryMatch = skill.category.toLowerCase().includes(searchTerm)
        const tagsMatch = skill.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
        const descriptionMatch = skill.description.toLowerCase().includes(searchTerm)

        return titleMatch || categoryMatch || tagsMatch || descriptionMatch
      })

      return filtered
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Search failed')
    }
  },
)

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    clearSearch: (state) => {
      state.query = ''
      state.results = []
      state.error = null
    },
    clearResults: (state) => {
      state.results = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performSearch.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(performSearch.fulfilled, (state, action) => {
        state.loading = false
        state.results = action.payload
      })
      .addCase(performSearch.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setSearchQuery, clearSearch, clearResults } = searchSlice.actions
export default searchSlice.reducer
