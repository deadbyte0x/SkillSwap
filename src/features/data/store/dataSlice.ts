import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type {  TeachSkill, User } from '@/shared/types'

interface DataState {
  skills: TeachSkill[]
  users: User[]
  loading: boolean
  error: string | null
  isLoaded: boolean
}

const initialState: DataState = {
  skills: [],
  users: [],
  loading: false,
  error: null,
  isLoaded: false,
}

export const loadAllData = createAsyncThunk('data/loadAllData', async () => {
  const [skillsRes, usersRes] = await Promise.all([
    fetch('/db/skills.json'),
    fetch('/db/users.json'),
  ])

  if (!skillsRes.ok || !usersRes.ok) {
    throw new Error('Ошибка загрузки данных')
  }

  const [skills, users] = await Promise.all([skillsRes.json(), usersRes.json()])

  return { skills, users }
})

export const loadSkills = createAsyncThunk('data/loadSkills', async () => {
  const res = await fetch('/db/skills.json')
  if (!res.ok) throw new Error('Ошибка загрузки навыков')
  const skills = await res.json()
  return { skills }
})

export const loadUsers = createAsyncThunk('data/loadUsers', async () => {
  const res = await fetch('/db/users.json')
  if (!res.ok) throw new Error('Ошибка загрузки пользователей')
  const users = await res.json()
  return { users }
})

// slice

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    clearData: (state) => {
      state.skills = []
      state.users = []
      state.isLoaded = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadAllData.fulfilled, (state, action) => {
        state.loading = false
        state.skills = action.payload.skills
        state.users = action.payload.users
        state.isLoaded = true
        state.error = null
      })
      .addCase(loadAllData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Ошибка загрузки'
      })
      .addCase(loadSkills.fulfilled, (state, action) => {
        state.skills = action.payload.skills
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload.users
      })
  },
})

export const { clearData, clearError } = dataSlice.actions
export default dataSlice.reducer
