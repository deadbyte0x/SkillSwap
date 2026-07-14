import styles from './SkillsMenu.module.css'
import { BriefcaseIcon, BookIcon, PaletteIcon, GlobalIcon, HomeIcon, LifestyleIcon } from '@/shared/ui'
import { SKILL_CATEGORIES } from '@/shared/lib/constants';
import { forwardRef } from 'react';
import clsx from 'clsx'

const CATEGORY_ICONS: Record<string,{Icon: React.ComponentType<{className?: string}>; className:string}> = {
    'business-career': {Icon: BriefcaseIcon, className: styles.briefIcon},
    'art': {Icon: PaletteIcon, className: styles.paletteIcon},
    'foreign-languages': {Icon: GlobalIcon, className: styles.globalIcon},
    'education': {Icon: BookIcon, className: styles.bookIcon},
    'home-comfort': {Icon: HomeIcon, className: styles.homeIcon},
    'health': {Icon: LifestyleIcon, className: styles.lifestyleIcon},
}

export const SkillsMenu = forwardRef<HTMLDivElement>(( _props, ref) => {
    return (
        <div ref={ref} className={styles.background}>
            <div className={styles.gridLayout}>
             {SKILL_CATEGORIES.map((category) => {
                const iconConfig = CATEGORY_ICONS[category.id]
                const Icon = iconConfig?.Icon
                return (
                  <article className={styles.card} key={category.id}>
                    {Icon && <Icon className={clsx(styles.icon, iconConfig.className)} />}
                    <div className={styles.cardTitle}>
                      <h2 className={styles.title}>{category.name}</h2>
                      <ul className={styles.paragraphList}>
                        {category.subCategories.map((sub) => (
                          <li key={sub.id}>{sub.name}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                )
             })}
            </div>
        </div>
    )
})

SkillsMenu.displayName = 'SkillsMenu'
