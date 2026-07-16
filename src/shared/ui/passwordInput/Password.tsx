import { useState, useEffect } from 'react'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { EyeToggle } from '../EyeToggle'
import styles from './Password.module.css'
import clsx from 'clsx'

interface PasswordProps {
  id?: string
  title?: string
  placeholder?: string
  hint?: string
  value?: string
  error?: string | null
  onChange?: (value: string) => void
  onBlur?: () => void
  validate?: (password: string) => string | null
}

export const Password = ({
  id,
  title = 'Пароль',
  placeholder = 'Введите ваш пароль',
  hint = 'Пароль должен содержать не менее 8 знаков',
  value = '',
  error,
  onChange,
  onBlur,
  validate,
}: PasswordProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const debouncedPassword = useDebounce(value, 300)
  const currentError = error ?? localError
  const isError = Boolean(currentError)

  const onClick = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    if (validate) {
      const result = validate(debouncedPassword)
      setLocalError(result)
    } else {
      setLocalError(null)
    }
  }, [debouncedPassword, validate])

  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label_text}>
        {title}
      </label>

      <div className={styles.input_wraper}>
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className={clsx(styles.input_field, isError ? styles.input_error : '')}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
        />
        <span className={styles.eye}>
          <EyeToggle isVisible={showPassword} onClick={onClick} />
        </span>
      </div>

      <span className={`${styles.hint_text} ${isError ? styles.hint_error : ''}`}>
        {currentError || hint}
      </span>
    </div>
  )
}
