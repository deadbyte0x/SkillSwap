import { useState, useEffect, ChangeEvent } from "react"
import { useDebounce } from "@/shared/hooks/useDebounce"
import styles from "./Email.module.css"
import clsx from 'clsx'

interface EmailProps {
    title?:string
    placeholder?:string
    onChange?: (value:string) => void
    validate?: (email: string) => string | null
}

export const Email = ({ title='Email', placeholder='Введите email', onChange, validate}:EmailProps) => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState<string | null>(null)
    const debouncedEmail = useDebounce(email, 300)
    const isError = Boolean(error);

    useEffect(() => {
      setError(validate ? validate(debouncedEmail) : null)
    }, [debouncedEmail, validate])

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=> {
      setEmail(e.target.value)
      onChange?.(e.target.value)
  }
    return (
      <div className={styles.container}>
        <label className={styles.label_text}>{title}</label>
        <div className={styles.input_wraper}>
          <input
            type={'email'}
            placeholder={placeholder}
            className={clsx(styles.input_field, isError ? styles.input_error : '')}
            value={email}
            onChange={handleChange}
          />
        </div>
        <span className={`${styles.hint_text} ${isError ? styles.hint_error : ''} `}>{error}</span>
      </div>
    )
}
