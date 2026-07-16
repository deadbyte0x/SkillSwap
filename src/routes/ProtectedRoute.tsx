import { Navigate, useLocation } from 'react-router-dom'
import React from 'react'
import { useAppSelector } from '@/store/hooks'
import { selectIsAuthenticated, selectUser } from '@/features/auth'

export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const isAuthChecked = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectUser)
  const location = useLocation()
  if (!isAuthChecked) {
    return <div>Проверяем авторизацию...</div>
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: {
            ...location,
            background: location.state?.background,
            state: null,
          },
        }}
        replace
      />
    )
  } else {
    return children
  }
}
