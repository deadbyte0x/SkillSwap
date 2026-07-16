import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'
import { selectUser } from '@/features/auth'
import React from 'react'

export const AuthRoute = ({ children }: { children: React.ReactElement }) => {
  const user = useAppSelector(selectUser)

  if (user) {
    return <Navigate to="/" replace />
  }

  return children
}
