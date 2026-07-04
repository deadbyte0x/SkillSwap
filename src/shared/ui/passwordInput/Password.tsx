import { useState } from "react"
import { EyeToggle } from "../EyeToggle"
import styles from "./Password.module.css"

interface PasswordProps {
    title?:string
    placeholder?:string

}

export const Password = ({ title='Имя', placeholder='Введите ваш пароль' }:PasswordProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState("")
    const isError = password.length > 0 && password.length < 8
    const onClick = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div className={styles.container}>
            <label className={styles.label_text}>{title}</label>
            <div className={styles.input_wraper}>
            <input type={showPassword ? 'text' : 'password'} placeholder={placeholder} className={`${styles.input_field} ${isError ? styles.input_error : ''}`} value={password} onChange={(e) => setPassword(e.target.value)}/>
            <span className={styles.eye}><EyeToggle isVisible={showPassword} onClick={onClick}></EyeToggle></span>
            </div>
            <span className={`${styles.hint_text} ${isError ? styles.hint_error : ''} `}>Пароль должен содержать не менее 8 знаков</span>
        </div>
    )
}