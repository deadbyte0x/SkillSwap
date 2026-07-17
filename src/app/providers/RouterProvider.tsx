import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ROUTES } from '@/shared/lib/constants'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { AuthRoute } from '@/routes/AuthRoute'

// Lazy-загрузка страниц — каждая страница грузится только при переходе на неё
const CatalogPage = lazy(() => import('@/pages/CatalogPage'))
const SkillPage = lazy(() => import('@/pages/SkillPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const ServerErrorPage = lazy(() => import('@/pages/ServerErrorPage'))
const PopularPage = lazy(() => import('@/pages/PopularPage'))
const NewUsersPage = lazy(() => import('@/pages/NewUsersPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))


export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route path={ROUTES.HOME} element={<CatalogPage />} />
          <Route path={ROUTES.POPULAR} element={<PopularPage />} />
          <Route path={ROUTES.NEW} element={<NewUsersPage />} />
          <Route path={ROUTES.SKILL} element={<SkillPage />} />
          <Route path={ROUTES.LOGIN} element={<AuthRoute><LoginPage /></AuthRoute>} />
          <Route path={ROUTES.REGISTER} element={<AuthRoute><RegisterPage /></AuthRoute>} />
          <Route path={ROUTES.ABOUT} element={<AboutPage/>} />

          {/* Защищённые маршруты — добавь PrivateRoute обёртку */}
          <Route path={ROUTES.PROFILE} element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path={ROUTES.FAVORITES} element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />

          <Route path={ROUTES.ERROR} element={<ServerErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
