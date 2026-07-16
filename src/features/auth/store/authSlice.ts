import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import type { AuthUser } from '@/shared/types'
import {
  getAuthUser,
  saveAuthUser,
  clearAuthUser,
  loginUser,
} from '../model/authUtils'

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

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

export const loginUserThunk = createAsyncThunk(
  'auth/loginUser',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const user = await loginUser(credentials.email, credentials.password)
      return user
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка входа',
      )
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  selectors: {
    selectAuth: (state) => state,
    selectUser: (state) => state.user,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectIsLoading: (state) => state.isLoading,
    selectAuthError: (state) => state.error,
  },
  extraReducers: (builder) => {
    builder
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

      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.isAuthenticated = false
        state.error =
          (action.payload as string) || action.error.message || 'Ошибка входа'
      })
  },
})

export const {
  selectAuth,
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectAuthError,
} = authSlice.selectors

export const { clearError } = authSlice.actions
export default authSlice.reducer
