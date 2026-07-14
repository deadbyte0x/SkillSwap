import { configureStore } from '@reduxjs/toolkit'
// Импортируй свои slice'ы здесь по мере их создания:
import { filterReducer } from '@/features/filters'
import { authReducer } from '@/features/auth'
import { dataReducer } from '@/features/data'

export const store = configureStore({
  reducer: {
    // skills: skillsReducer,
    filters: filterReducer,
    auth: authReducer,
    data: dataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
