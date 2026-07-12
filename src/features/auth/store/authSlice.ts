import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AuthUser } from '@/shared/types'
import { getAuthUser, saveAuthUser, clearAuthUser } from '../model/authUtils'

// ─── ТИПЫ ───

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// ─── НАЧАЛЬНОЕ СОСТОЯНИЕ ───

const initialState: AuthState = {
  user: getAuthUser(),
  isAuthenticated: !!getAuthUser(),
  isLoading: false,
  error: null,
}

// ─── SLICE ───

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<Omit<AuthUser, 'token'>>) => {
      const authUser = saveAuthUser(action.payload)
      state.isLoading = false
      state.user = authUser
      state.isAuthenticated = true
      state.error = null
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    logout: (state) => {
      clearAuthUser()
      state.user = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions
export default authSlice.reducer
