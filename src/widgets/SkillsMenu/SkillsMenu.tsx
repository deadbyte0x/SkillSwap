import styles from './SkillsMenu.module.css'
import { BriefcaseIcon, BookIcon, PaletteIcon, GlobalIcon, HomeIcon, LifestyleIcon } from '@/shared/ui'

export const SkillsMenu = () => {
    return (
        <main className={styles.background}>
            <div className={styles.gridLayout}>
                <article className={styles.card}>
                    <span className={styles.cardTitle}>
                        <BriefcaseIcon className={`${styles.icon} ${styles.briefIcon}`}/>
                        <h2 className={styles.title}>Бизнес и карьера</h2>
                    </span>
                    <div className={styles.paragraphList}>
                        <p>Управление командой</p>
                        <p>Маркетинг и реклама</p>
                        <p>Продажи и переговоры</p>
                        <p>Личный бренд</p>
                        <p>Резюме и собеседование</p>
                        <p>Тайм-менеджмент</p>
                        <p>Проектное управление</p>
                        <p>Предпринимательство</p>
                    </div>
                </article>
                
                <article className={styles.card}>
                    <span className={styles.cardTitle}>
                        <PaletteIcon className={`${styles.icon} ${styles.briefIcon}`}/>
                        <h2 className={styles.title}>Творчество и искусство</h2>
                    </span>
                    <div className={styles.paragraphList}>
                        <p>Рисование и иллюстрация</p>
                        <p>Фотография</p>
                        <p>Видеомонтаж</p>
                        <p>Музыка и звук</p>
                        <p>Актёрское мастерство</p>
                        <p>Креативное письмо</p>
                        <p>Арт-терапия</p>
                        <p>Декор и DIY</p>
                    </div>
                </article>

                <article className={styles.card}>
                    <span className={styles.cardTitle}>
                        <GlobalIcon className={`${styles.icon} ${styles.globalIcon}`}/>
                        <h2 className={styles.title}>Иностранные языки</h2>
                    </span>
                    <div className={styles.paragraphList}>
                        <p>Английский</p>
                        <p>Французский</p>
                        <p>Испанский</p>
                        <p>Немецкий</p>
                        <p>Китайский</p>
                        <p>Японский</p>
                        <p>Подготовка к экзаменам (IELTS, TOEFL)</p>
                    </div>
                </article>

                <article className={styles.card}>
                    <span className={styles.cardTitle}>
                        <BookIcon className={`${styles.icon} ${styles.bookIcon}`}/>
                        <h2 className={styles.title}>Образование и развитие</h2>
                    </span>
                    <div className={styles.paragraphList}>
                        <p>Личностное развитие</p>
                        <p>Навыки обучения</p>
                        <p>Когнитивные техники</p>
                        <p>Скорочтение</p>
                        <p>Навыки преподавания</p>
                        <p>Коучинг</p>
                    </div>
                </article>

                <article className={styles.card}>
                    <span className={styles.cardTitle}>
                        <HomeIcon className={`${styles.icon} ${styles.homeIcon}`}/>
                        <h2 className={styles.title}>Дом и уют</h2>
                    </span>
                    <div className={styles.paragraphList}>
                        <p>Уборка и организация</p>
                        <p>Домашние финансы</p>
                        <p>Приготовление еды</p>
                        <p>Домашние растения</p>
                        <p>Ремонт</p>
                        <p>Хранение вещей</p>
                    </div>
                </article>

                <article className={styles.card}>
                    <span className={styles.cardTitle}>
                        <LifestyleIcon className={`${styles.icon} ${styles.lifestyleIcon}`}/>
                        <h2 className={styles.title}>Здоровье и лайфстайл</h2>
                    </span>
                    <div className={styles.paragraphList}>
                        <p>Йога и медитация</p>
                        <p>Питание и ЗОЖ</p>
                        <p>Ментальное здоровье</p>
                        <p>Осознанность</p>
                        <p>Физические тренировки</p>
                        <p>Сон и восстановление</p>
                        <p>Баланс жизни и работы</p>
                    </div>
                </article>                                                                                            
            </div>
        </main>
    )
}