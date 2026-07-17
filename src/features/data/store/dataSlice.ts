import {
  createSlice,
  createAsyncThunk,
  nanoid,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit'
import type {  TeachSkill, User } from '@/shared/types'
import { CATEGORY_BY_ID, SUBCATEGORY_BY_ID } from '@/shared/lib/constants.ts'

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
      state.loading = false
      state.isLoaded = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
    addUserWithSkill: {
      prepare: (data: {
        user: Omit<User, 'id' | 'teachSkillId'>
        skill: Omit<TeachSkill, 'id' | 'authorId'>
      }) => {
        const userId = nanoid()
        const skillId = nanoid()
        return {
          payload: {
            user: {
              ...data.user,
              id: userId,
              teachSkillId: skillId,
            },
            skill: {
              ...data.skill,
              id: skillId,
              authorId: userId,
            },
          },
        }
      },
      reducer: (state, action: PayloadAction<{ user: User; skill: TeachSkill }>) => {
        state.users = [...state.users, action.payload.user]
        state.skills = [...state.skills, action.payload.skill]
      },
    },
    // Счетчик лайков у пользователя
    adjustLikesCount: (state, action: PayloadAction<{ userId: string; delta: 1 | -1 }>) => {
      const user = state.users.find((u) => u.id === action.payload.userId)
      if (user) {
        user.likesCount = Math.max(0, (user.likesCount ?? 0) + action.payload.delta)
      }
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
  selectors: {
    getAllSkills: (sliceState) => sliceState.skills,
    getAllUsers: (sliceState) => sliceState.users,
    getDataError: (sliceState) => sliceState.error,
    getDataIsLoading: (sliceState) => sliceState.loading,
    getDataIsLoaded: (sliceState) => sliceState.isLoaded,
    getUserById: (sliceState, id: string) => sliceState.users.find((u) => u.id === id),
    getSkillById: (sliceState, id: string) => sliceState.skills.find((s) => s.id === id),
    getSimilarSkillsBySubcategoryId: (sliceState, id: string) => {
      const subcategory = SUBCATEGORY_BY_ID.get(id)
      const category = CATEGORY_BY_ID.get(subcategory?.categoryId || '')
      const subcategoriesIds = category?.subCategories.map((s) => s.id) || []
      const sameSubcategory = sliceState.skills.filter((s) => s.subCategoryId === id)
      const sameCategory = sliceState.skills.filter(
        (s) => subcategoriesIds.includes(s.subCategoryId) && s.subCategoryId !== id,
      )
      return [...sameSubcategory, ...sameCategory]
    },
    getUserLikesCount: (sliceState, userId: string) => {
      const user = sliceState.users.find((u) => u.id === userId)
      return user?.likesCount ?? 0
    },
    getUsersByIds: (sliceState, ids: string[]) =>
      sliceState.users.filter((u) => ids.includes(u.id)),
    getUsersNewest: createSelector(
      [
        (sliceState: DataState) => sliceState.users,
        (_sliceState: DataState, limit?: number) => limit,
        (_sliceState: DataState, _limit?: number, offset?: number) => offset,
      ],
      (users, limit, offset) =>
        [...users]
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
          // Some arbitrary limit
          .slice(0, 15)
          .slice(offset ?? 0, (offset ?? 0) + (limit ?? users.length)),
    ),

    getUsersPopular: createSelector(
      [
        (sliceState: DataState) => sliceState.users,
        (_sliceState: DataState, limit?: number) => limit,
        (_sliceState: DataState, _limit?: number, offset?: number) => offset,
      ],
      (users, limit, offset) =>
        [...users]
          .sort((a, b) => (b.likesCount ?? 0) - (a.likesCount ?? 0))
          // Some arbitrary limit
          .slice(0, 15)
          .slice(offset ?? 0, (offset ?? 0) + (limit ?? users.length)),
    ),
    getUsersRecommended: createSelector(
      [
        (sliceState: DataState) => sliceState.users,
        (_sliceState: DataState, limit?: number) => limit,
        (_sliceState: DataState, _limit?: number, offset?: number) => offset,
      ],
      (users, limit, offset) => {
        // Some smart recommendation system
        const n = users.length
        const step = 13
        const result: User[] = []
        for (let k = 0, i = step - 1; k < n; k++, i = (i + step) % n) {
          result.push(users[i])
        }
        return result.slice(offset ?? 0, (offset ?? 0) + (limit ?? users.length))
      },
    ),
  },
})

export const {
  getAllSkills,
  getAllUsers,
  getDataError,
  getDataIsLoading,
  getDataIsLoaded,
  getUserById,
  getSkillById,
  getUserLikesCount,
  getUsersByIds,
  getUsersNewest,
  getUsersPopular,
  getUsersRecommended,
  getSimilarSkillsBySubcategoryId,
} = dataSlice.selectors
export const { clearData, clearError, addUserWithSkill, adjustLikesCount } = dataSlice.actions
export default dataSlice.reducer
