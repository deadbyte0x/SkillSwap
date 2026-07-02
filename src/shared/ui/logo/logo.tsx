import styles from './logo.module.css'
import logoImage from './logo-icon.svg'

export const Logo = () => {
return (
    <div className={styles.logoContainer}>
        <img src={logoImage} alt="Logo image" className={styles.logoImage}/>
        <span className={styles.logoText}>SkillSwap</span>
    </div>
)
}