import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import type { AuthUser } from '@/shared/types'
import { getAuthUser, saveAuthUser, clearAuthUser } from '../model/authUtils'
import { adjustLikesCount } from '@/features/data'
import type { RootState, AppDispatch } from '@/store'

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// ─── НАЧАЛЬНОЕ СОСТОЯНИЕ ───
const initialState: AuthState = {
  user: null,
  // Проверили ли мы юзера
  isAuthenticated: false,
  isLoading: false,
  error: null,
}
export const getUser = createAsyncThunk('auth/getUser', async () => {
  const user = getAuthUser()
  if (!user) throw new Error('Не авторизован')
  return user
})

export const saveUser = createAsyncThunk(
  'auth/saveUser',
  async (userData: Omit<AuthUser, 'token'>) => {
    return saveAuthUser(userData)
  },
)

export const clearUser = createAsyncThunk('auth/clearUser', async () => {
  clearAuthUser()
})

// Редьюсер лайка

export const toggleFavoriteUser = createAsyncThunk<
  AuthUser,
  string,
  { state: RootState; dispatch: AppDispatch; rejectValue: string }
>('auth/toggleFavorite', async (targetUserId, { getState, dispatch, rejectWithValue }) => {
  const currentUser = getState().auth.user

  if (!currentUser) {
    return  rejectWithValue('Не авторизован')
  }

  const wasLiked = currentUser.favoriteUserIds.includes(targetUserId)
  const favoriteUserIds = wasLiked
    ? currentUser.favoriteUserIds.filter((id) => id !== targetUserId)
    : [...currentUser.favoriteUserIds, targetUserId]

  const updatedUser = saveAuthUser({ ...currentUser, favoriteUserIds })
  dispatch(adjustLikesCount({ userId: targetUserId, delta: wasLiked ? -1 : 1 }))

  return updatedUser
})

// ─── SLICE ───

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // get user
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.isAuthenticated = true
        state.error = action.error.message || 'Ошибка получения'
      })
      // save user
      .addCase(saveUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(saveUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(saveUser.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.isAuthenticated = true
        state.error = action.error.message || 'Ошибка сохранения'
      })
      // clear user
      .addCase(clearUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(clearUser.fulfilled, (state) => {
        state.isLoading = false
        state.user = null
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(clearUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Ошибка выхода'
      })
      // Обработка событий лайка
      .addCase(toggleFavoriteUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(toggleFavoriteUser.rejected, (state, action) => {
        state.error = action.payload || 'Ошибка обновления лайка'
      })
  },
  selectors: {
    selectAuth: state => state,
    selectUser: state => state.user,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectIsLoading: state => state.isLoading,
    selectAuthError: state => state.error
  }
})

// ─── СЕЛЕКТОРЫ ───
export const { selectAuth, selectUser, selectIsAuthenticated, selectIsLoading, selectAuthError } = authSlice.selectors
export const selectIsUserLiked = createSelector([selectUser, (_state: RootState, userId: string) => userId],
(user, userId) => !!user?.favoriteUserIds.includes(userId))

export const { clearError } = authSlice.actions
export default authSlice.reducer
