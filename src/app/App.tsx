import { AppRouter } from './providers/RouterProvider'
import './styles/global.css'
import { useEffect } from 'react'
import { useAppDispatch } from '@/store/hooks.ts'
import { getUser } from '@/features/auth'
import { loadAllData } from '@/features/data'

export function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser())
    dispatch(loadAllData())
  }, [dispatch])

  return (
    <AppRouter />
  )
}
