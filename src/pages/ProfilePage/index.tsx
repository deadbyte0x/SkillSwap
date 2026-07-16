import { useRef } from 'react'
import styles from './ProfilePage.module.css'

export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.content}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarImageContainer}>
                <div className={styles.avatarPlaceholder}>Фото</div>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={styles.avatarEditButton}
                aria-label="Изменить фото"
              >
                Изм.
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className={styles.hiddenInput}
              />
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.fieldBlock}>
              <label htmlFor="email" className={styles.label}>
                Почта
              </label>

              <div className={styles.inputWrapper}>
                <input
                  id="email"
                  type="email"
                  placeholder="Введите email"
                  defaultValue="maria@gmail.com"
                  className={styles.input}
                />
              </div>

              <button type="button" className={styles.passwordButton}>
                Изменить пароль
              </button>
            </div>

            <div className={styles.fieldBlock}>
              <label htmlFor="name" className={styles.label}>
                Имя
              </label>

              <div className={styles.inputWrapper}>
                <input
                  id="name"
                  type="text"
                  placeholder="Введите имя"
                  defaultValue="Мария"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.fieldColumn}>
                <label htmlFor="birthDate" className={styles.label}>
                  Дата рождения
                </label>

                <div className={styles.inputWrapper}>
                  <input
                    id="birthDate"
                    type="text"
                    placeholder="ДД.ММ.ГГГГ"
                    defaultValue="28.10.1995"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.fieldColumn}>
                <label htmlFor="gender" className={styles.label}>
                  Пол
                </label>

                <div className={styles.inputWrapper}>
                  <input
                    id="gender"
                    type="text"
                    placeholder="Выберите пол"
                    defaultValue="Женский"
                    className={styles.input}
                  />
                </div>
              </div>
            </div>

            <div className={styles.fieldBlock}>
              <label htmlFor="city" className={styles.label}>
                Город
              </label>

              <div className={styles.inputWrapper}>
                <input
                  id="city"
                  type="text"
                  placeholder="Выберите город"
                  defaultValue="Москва"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.fieldBlock}>
              <label htmlFor="about" className={styles.label}>
                О себе
              </label>

              <div className={styles.textareaWrapper}>
                <textarea
                  id="about"
                  placeholder="Расскажите о себе"
                  defaultValue="Люблю учиться новому, особенно если это можно делать за чаем и в пижаме. Всегда готова пообщаться и обменяться чем-то интересным!"
                  rows={4}
                  className={styles.textarea}
                />
              </div>
            </div>

            <button type="button" className={styles.submitButton}>
              Сохранить
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
