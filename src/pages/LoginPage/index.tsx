import styles from './LoginPage.module.css'
import { Header } from '@/widgets/Header';
import clsx from 'clsx'
import { FormEventHandler, useCallback, useEffect, useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { Password } from '@/shared/ui/passwordInput'
import { Email } from '@/shared/ui/emailInput'
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts'
import { clearError, loginUserThunk, selectAuthError, selectIsLoading } from '@/features/auth'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/lib/constants.ts'


const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_RE = /.{8,}/

function getEmailError(email: string): string | null {
  if (!email) return "Введите email"
  if (!EMAIL_RE.test(email)) return 'Некорректный email'
  return null
}

function getPasswordError(password: string): string | null {
  if (!password) return "Введите пароль"
  if (!PASSWORD_RE.test(password))
    return `Пароль должен содержать не менее 8 знаков`
  return null
}


export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const authError = useAppSelector(selectAuthError)
  const isLoading = useAppSelector(selectIsLoading)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const validateEmail = useCallback(
    (value: string) => (!isSubmitted && !value ? null : getEmailError(value)),
    [isSubmitted],
  )
  const validatePassword = useCallback(
    (value: string) => (!isSubmitted && !value ? null : getPasswordError(value)),
    [isSubmitted],
  )

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (getEmailError(email) || getPasswordError(password)) return
    dispatch(loginUserThunk({email, password}))
  }
  return (
    <>
      <Header variant={'pure'} />
      <main className={styles.page}>
        <h2 className={styles.title}>Вход</h2>
        <div className={styles.cards}>
          <div className={clsx(styles.card, styles.formCard)}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formUpper}>
                <div className={styles.externalLoginButtons}>
                  <Button
                    className={styles.fullWidth}
                    variant={'secondary'}
                    onClick={() => alert('Вы правда думали, что это сработает?')}
                  >
                    Прдлжить с Google
                  </Button>
                  <Button
                    className={styles.fullWidth}
                    variant={'secondary'}
                    onClick={() => alert('Если что, abc@abc.abc / 12345678')}
                  >
                    Прдлжть с Appl
                  </Button>
                </div>
                <div className={styles.separationLine}>
                  <div className={styles.separator} />
                  <span className={styles.separatorText}>или</span>
                  <div className={styles.separator} />
                </div>
                <div className={styles.errorInputs}>
                  <div className={styles.inputs}>
                    <Email onChange={setEmail} validate={validateEmail} />
                    <Password onChange={setPassword} validate={validatePassword} />
                  </div>
                  {authError && <span className={styles.formError}>{authError}</span>}
                </div>
              </div>
              <div className={styles.buttons}>
                <Button
                  className={styles.fullWidth}
                  variant={'primary'}
                  type={'submit'}
                  disabled={isLoading}
                >
                  Войти
                </Button>
                <button
                  type="button"
                  className={styles.registerButton}
                  onClick={() => navigate(ROUTES.REGISTER)}
                >
                  Зарегистрироваться
                </button>
              </div>
            </form>
          </div>
          <div className={clsx(styles.card, styles.textCard)}>
            <img
              src="/images/illustrations/light-bulb.png"
              alt="Лампочка"
              className={styles.illustration}
            />
            <div className={styles.textCardText}>
              <h3 className={styles.textCardTitle}>С возвращением в SkillSwap!</h3>
              <p className={styles.textCardSubtitle}>
                Обменивайтесь знаниями и навыками с другими людьми
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
