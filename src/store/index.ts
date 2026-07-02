import { configureStore } from '@reduxjs/toolkit'
// Импортируй свои slice'ы здесь по мере их создания:
// import skillsReducer from '@/entities/skill/model/skillsSlice'
// import authReducer from '@/features/auth/model/authSlice'
import searchReducer from '@/features/search/store/searchSlice' // ← Добавляем поиск

export const store = configureStore({
  reducer: {
    // skills: skillsReducer,
    // auth: authReducer,
    search: searchReducer, // ← Добавляем search в reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
