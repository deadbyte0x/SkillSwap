import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import { Button } from '@/shared/ui/Button'
import { ROUTES } from '@/shared/lib/constants.ts'
import styles from './NotFoundPage.module.css'

type NotFoundPageProps = {
  variant?: 'logged-out' | 'logged-in' | 'pure' // статус хэдера, приходит извне (например, из роутера)
  userName?: string
  userAvatar?: string
}

export const NotFoundPage = ({
  variant = 'logged-out',
  userName,
  userAvatar,
}: NotFoundPageProps) => {
  const handleReportError = () => {
    // пока что заглушка отчета об ошибке
  }

  return (
    <div className={styles.page}>
      <Header variant={variant} userName={userName} userAvatar={userAvatar} />

      <main className={styles.content}>
        <img
          src="/images/illustrations/error-404.png"
          alt="Страница не найдена"
          className={styles.illustration}
        />

        <div className={styles.textGroup}>
          <h1 className={styles.title}>Страница не найдена</h1>
          <p className={styles.description}>
            К сожалению, эта страница недоступна. Вернитесь на главную страницу
            или попробуйте позже
          </p>
        </div>

        <div className={styles.actions}>
          <Button variant="secondary" onClick={handleReportError}>
            Сообщить об ошибке
          </Button>
          <Button variant="primary" onClick={() => (window.location.href = ROUTES.HOME)}>
            На главную
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}