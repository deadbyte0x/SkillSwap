import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthUser } from '@/shared/types'
import { getAuthUser, saveAuthUser, clearAuthUser } from '../model/authUtils'

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// ─── НАЧАЛЬНОЕ СОСТОЯНИЕ ───
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}
export const getUser = createAsyncThunk('auth/getUser', async () => {
  await new Promise((r) => setTimeout(r, 300))
  const user = getAuthUser()
  if (!user) throw new Error('Не авторизован')
  return user
})

export const saveUser = createAsyncThunk(
  'auth/saveUser',
  async (userData: Omit<AuthUser, 'token'>) => {
    await new Promise((r) => setTimeout(r, 500))
    return saveAuthUser(userData)
  },
)

export const clearUser = createAsyncThunk('auth/clearUser', async () => {
  await new Promise((r) => setTimeout(r, 200))
  clearAuthUser()
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
        state.isAuthenticated = false
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
        state.isAuthenticated = false
        state.error = action.error.message || 'Ошибка сохранения'
      })
      // clear user
      .addCase(clearUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(clearUser.fulfilled, (state) => {
        state.isLoading = false
        state.user = null
        state.isAuthenticated = false
        state.error = null
      })
      .addCase(clearUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Ошибка выхода'
      })
  },
})

// ─── СЕЛЕКТОРЫ ───

export const selectAuth = (state: { auth: AuthState }) => state.auth
export const selectUser = (state: { auth: AuthState }) => state.auth.user
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error

export const selectAuthStatus = (state: { auth: AuthState }) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  error: state.auth.error,
})

export const selectUserWithStatus = (state: { auth: AuthState }) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
