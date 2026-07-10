import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import { Button } from '@/shared/ui/Button'
import { ROUTES } from '@/shared/lib/constants.ts'
import styles from './ServerErrorPage.module.css'

type ServerErrorPageProps = {
  variant?: 'logged-out' | 'logged-in' | 'pure'
  userName?: string
  userAvatar?: string
}

export const ServerErrorPage = ({
  variant = 'logged-out',
  userName,
  userAvatar,
}: ServerErrorPageProps) => {
  const handleReportError = () => {
    // Заглушка: отправка отчёта если бы у нас был бэк
  }

  return (
    <div className={styles.page}>
      <Header variant={variant} userName={userName} userAvatar={userAvatar} />

      <main className={styles.content}>
        <img
          src="/images/illustrations/error-500.png"
          alt="Ошибка сервера"
          className={styles.illustration}
        />

        <div className={styles.textGroup}>
          <h1 className={styles.title}>На сервере произошла ошибка</h1>
          <p className={styles.description}>
            Попробуйте позжк или вернитесь на главную страницу
          </p>
        </div>

        <div className={styles.actions}>
          <Button variant="secondary" onClick={handleReportError}>
            Сообщить об ошибке
          </Button>

          <Button
            variant="primary"
            onClick={() => {
              window.location.href = ROUTES.HOME
            }}
          >
            На главную
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}