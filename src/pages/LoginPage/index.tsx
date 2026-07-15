import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { ROUTES } from '@/shared/lib/constants'
import {
  loginUserThunk,
  selectIsLoading,
  selectAuthError,
  clearError,
} from '@/features/auth/store/authSlice'

type FormData = {
  email: string
  password: string
}

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoading = useAppSelector(selectIsLoading)
  const authError = useAppSelector(selectAuthError)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    dispatch(clearError())

    const resultAction = await dispatch(
      loginUserThunk({
        email: data.email,
        password: data.password,
      }),
    )

    if (loginUserThunk.fulfilled.match(resultAction)) {
      navigate(ROUTES.HOME)
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f5f1]">
      <header className="flex items-center justify-between px-6 py-6 lg:px-10">
        <Link to={ROUTES.HOME} className="text-[32px] font-semibold leading-none">
          SkillSwap
        </Link>

        <Link
          to={ROUTES.HOME}
          className="rounded-2xl bg-white px-6 py-4 text-lg text-[#2d2d20] shadow-sm transition hover:opacity-90"
        >
          Закрыть
        </Link>
      </header>

      <main className="mx-auto max-w-[1136px] px-4 pb-10 lg:px-6">
        <h1 className="mb-8 text-center text-[36px] font-semibold text-[#2d2d20]">
          Вход
        </h1>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl bg-white px-6 py-8 shadow-sm sm:px-10 lg:px-14 lg:py-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <button
                type="button"
                className="mb-4 flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-[#a8a391] bg-white text-base text-[#2d2d20]"
              >
                Продолжить с Google
              </button>

              <button
                type="button"
                className="mb-6 flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-[#a8a391] bg-white text-base text-[#2d2d20]"
              >
                Продолжить с Apple
              </button>

              <div className="mb-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#e3e0d7]" />
                <span className="text-base text-[#2d2d20]">или</span>
                <div className="h-px flex-1 bg-[#e3e0d7]" />
              </div>

              <div className="mb-4">
                <label className="mb-1 block text-base text-[#2d2d20]">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Введите email"
                  {...register('email', {
                    required: 'Email обязателен',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Неверный формат email',
                    },
                  })}
                  className="h-12 w-full rounded-2xl border border-[#a8a391] px-4 text-base outline-none transition focus:border-[#89b65c]"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="mb-1 block text-base text-[#2d2d20]">
                  Пароль
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Введите ваш пароль"
                    {...register('password', {
                      required: 'Пароль обязателен',
                      minLength: {
                        value: 8,
                        message: 'Минимум 8 символов',
                      },
                    })}
                    className="h-12 w-full rounded-2xl border border-[#a8a391] px-4 pr-12 text-base outline-none transition focus:border-[#89b65c]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-lg"
                    aria-label={
                      showPassword ? 'Скрыть пароль' : 'Показать пароль'
                    }
                  >
                    {showPassword ? '🙈' : '👁'}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {authError && (
                <p className="mb-4 text-sm text-red-500">{authError}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 h-12 w-full rounded-2xl bg-[#b4d77a] text-base font-medium text-[#2d2d20] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? 'Вход...' : 'Войти'}
              </button>
            </form>

            <p className="mt-6 text-center text-base text-[#78a04a]">
              <Link to={ROUTES.REGISTER} className="hover:underline">
                Зарегистрироваться
              </Link>
            </p>
          </section>

          <section className="flex flex-col items-center justify-center rounded-3xl bg-white px-6 py-10 text-center shadow-sm sm:px-10">
            <div className="mb-8 text-7xl">💡</div>

            <h2 className="mb-4 text-[32px] font-semibold leading-tight text-[#2d2d20]">
              С возвращением в SkillSwap!
            </h2>

            <p className="max-w-[420px] text-base leading-7 text-[#2d2d20]">
              Обменивайтесь знаниями и навыками с другими людьми
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
