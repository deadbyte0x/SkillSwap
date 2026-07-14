import { useState, useEffect } from "react"
import { useDebounce } from "@/shared/hooks/useDebounce"
import { EyeToggle } from "../EyeToggle"
import styles from "./Password.module.css"
import clsx from 'clsx'

interface PasswordProps {
    title?:string
    placeholder?:string
    hint?: string
    onChange?: (value:string) => void
    validate?: (password: string) => string | null
}

export const Password = ({ title='Пароль', placeholder='Введите ваш пароль', hint='Пароль должен содержать не менее 8 знаков', onChange, validate}:PasswordProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const debouncedPassword = useDebounce(password, 300)
    const isError = Boolean(error);
    const onClick = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        if (validate) {
            const result = validate(debouncedPassword)
            setError(result)
        } else {
            setError(null)
        }

        onChange?.(debouncedPassword)
    }, [debouncedPassword, onChange, validate])
    return (
        <div className={styles.container}>
            <label className={styles.label_text}>{title}</label>
            <div className={styles.input_wraper}>
            <input type={showPassword ? 'text' : 'password'} placeholder={placeholder} className={clsx(styles.input_field, isError ? styles.input_error : '')} value={password} onChange={(e) => setPassword(e.target.value)}/>
            <span className={styles.eye}><EyeToggle isVisible={showPassword} onClick={onClick}></EyeToggle></span>
            </div>
            <span className={`${styles.hint_text} ${isError ? styles.hint_error : ''} `}>{error || hint}</span>
        </div>
    )
}
