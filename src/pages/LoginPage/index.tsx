import { Link, useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'

import { Header } from '@/widgets/Header/Header'
import { Button } from '@/shared/ui/Button'
import { Password } from '@/shared/ui/passwordInput/Password.tsx'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { ROUTES } from '@/shared/lib/constants'
import {
  saveUser,
  selectIsLoading,
  selectAuthError,
  clearError,
} from '@/features/auth/store/authSlice'
import styles from './LoginPage.module.css'

type FormData = {
  email: string
  password: string
}

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoading = useAppSelector(selectIsLoading)
  const authError = useAppSelector(selectAuthError)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    dispatch(clearError())

    const resultAction = await dispatch(
      saveUser({
        id: '1',
        name: data.email.split('@')[0] || 'User',
        email: data.email,
        favoriteUserIds: [],
        unreadNotificationUserIds: [],
        readNotificationUserIds: [],
      }),
    )

    if (saveUser.fulfilled.match(resultAction)) {
      navigate(ROUTES.HOME)
    }
  }

  return (
    <div className={styles.page}>
      <Header variant="pure" />

      <main className={styles.main}>
        <h1 className={styles.title}>Вход</h1>

        <div className={styles.grid}>
          <section className={styles.formSection}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Button
                type="button"
                variant="secondary"
                className={styles.socialButton}
              >
                Продолжить с Google
              </Button>

              <Button
                type="button"
                variant="secondary"
                className={styles.socialButtonApple}
              >
                Продолжить с Apple
              </Button>

              <div className={styles.divider}>
                <div className={styles.dividerLine} />
                <span className={styles.dividerText}>или</span>
                <div className={styles.dividerLine} />
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Введите email"
                  {...register('email', {
                    required: 'Email обязателен',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Неверный формат email',
                    },
                  })}
                  className={styles.input}
                />
                {errors.email && (
                  <p className={styles.errorText}>{errors.email.message}</p>
                )}
              </div>

              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'Пароль обязателен',
                  minLength: {
                    value: 8,
                    message: 'Минимум 8 символов',
                  },
                }}
                render={({ field, fieldState }) => (
                  <Password
                    id="password"
                    title="Пароль"
                    placeholder="Введите ваш пароль"
                    hint="Пароль должен содержать не менее 8 знаков"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={fieldState.error?.message ?? null}
                  />
                )}
              />

              {authError && <p className={styles.authError}>{authError}</p>}

              <Button
                type="submit"
                disabled={isLoading}
                className={styles.submitButton}
              >
                {isLoading ? 'Вход...' : 'Войти'}
              </Button>
            </form>

            <p className={styles.registerText}>
              <Link to={ROUTES.REGISTER} className={styles.registerLink}>
                Зарегистрироваться
              </Link>
            </p>
          </section>

          <section className={styles.infoSection}>
            <div className={styles.infoIcon}></div>

            <h2 className={styles.infoTitle}>С возвращением в SkillSwap!</h2>

            <p className={styles.infoText}>
              Обменивайтесь знаниями и навыками с другими людьми
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
