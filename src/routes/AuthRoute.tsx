import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'
import { selectIsAuthenticated, selectUser } from '@/features/auth'
import React from 'react'

export const AuthRoute = ({ children }: { children: React.ReactElement }) => {
  const isAuthChecked = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectUser)
  if (!isAuthChecked) {
    return <div>Проверяем авторизацию...</div>
  }


  if (user) {
    return <Navigate to="/" replace />
  }

  return children
}
