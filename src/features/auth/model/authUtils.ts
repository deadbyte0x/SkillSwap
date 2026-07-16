import type { AuthUser } from '@/shared/types'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'

/** Читает текущего авторизованного пользователя из localStorage */
export function getAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_USER)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

/** Сохраняет пользователя и mock-токен в localStorage */
export function saveAuthUser(user: Omit<AuthUser, 'token'>): AuthUser {
  const authUser: AuthUser = { ...user, token: 'mock_token_' + user.id }
  localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_USER, JSON.stringify(authUser))
  return authUser
}

/** Удаляет пользователя из localStorage (logout) */
export function clearAuthUser(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_USER)
}

/** Фейковый логин по хардкоженным данным */
export async function loginUser(
  email: string,
  password: string,
): Promise<AuthUser> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (email === 'test@example.com' && password === '12345678') {
    return saveAuthUser({
      id: '1',
      name: 'SkillSwap User',
      email: 'test@example.com',
      favoriteUserIds: [],
      unreadNotificationUserIds: [],
      readNotificationUserIds: [],
    })
  }

  throw new Error('Неверный email или пароль')
}
