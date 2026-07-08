import { useState, useEffect } from "react"
import { useDebounce } from "@/shared/hooks/useDebounce"
import { EyeToggle } from "../EyeToggle"
import styles from "./Password.module.css"

interface PasswordProps {
    title?:string
    placeholder?:string
    hint?: string
    onChange?: (value:string) => void
    validate?: string
}

export const Password = ({ title='Пароль', placeholder='Введите ваш пароль', hint='Пароль должен содержать не менее 8 знаков', onChange, validate}:PasswordProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState("")
    const debouncedPassword = useDebounce(password, 300)
    const isError = Boolean(validate);
    const onClick = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        onChange?.(debouncedPassword)
    }, [debouncedPassword, onChange])
    return (
        <div className={styles.container}>
            <label className={styles.label_text}>{title}</label>
            <div className={styles.input_wraper}>
            <input type={showPassword ? 'text' : 'password'} placeholder={placeholder} className={`${styles.input_field} ${isError ? styles.input_error : ''}`} value={password} onChange={(e) => setPassword(e.target.value)}/>
            <span className={styles.eye}><EyeToggle isVisible={showPassword} onClick={onClick}></EyeToggle></span>
            </div>
            <span className={`${styles.hint_text} ${isError ? styles.hint_error : ''} `}>{validate || hint}</span>
        </div>
    )
}