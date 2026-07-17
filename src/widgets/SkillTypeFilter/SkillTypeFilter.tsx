import { RadioButton } from "@/shared/ui/radio-button"
import styles from './skill-type-filter.module.css'
import { FilterType } from '@/shared/types'

interface FilterProps {
  value: FilterType
  onChange: (value: FilterType) => void
}


export const SkillTypeFilter = ({ value, onChange }: FilterProps) => {

  return (
    <ul className={styles.container}>
      <li className={styles.li}>
        <RadioButton checked={value === 'all'} onClick={() => onChange('all')} />
        <span className={styles.text}>Все</span>
      </li>

      <li className={styles.li}>
        <RadioButton checked={value === 'learn'} onClick={() => onChange('learn')} />
        <span className={styles.text}>Хочу научиться</span>
      </li>

      <li className={styles.li}>
        <RadioButton checked={value === 'teach'} onClick={() => onChange('teach')} />
        <span className={styles.text}>Могу научить</span>
      </li>
    </ul>
  )
};
