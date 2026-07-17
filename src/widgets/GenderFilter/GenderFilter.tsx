import { RadioButton } from "@/shared/ui/radio-button"
import { GenderFilterType } from '@/shared/types'
import styles from './genderFilter.module.css'

interface FilterProps {
  value: GenderFilterType
  onChange: (value: GenderFilterType) => void
}

export const GenderFilter = ({ value, onChange }: FilterProps) => {

  return (
    <div>
      <h3 className={styles.label}>Пол автора</h3>
      <ul className={styles.container}>
        <li className={styles.li}>
          <RadioButton checked={value === 'any'} onClick={() => onChange('any')} />
          <span className={styles.text}>Не имеет значения</span>
        </li>

        <li className={styles.li}>
          <RadioButton checked={value === 'male'} onClick={() => onChange('male')} />
          <span className={styles.text}>Мужской</span>
        </li>

        <li className={styles.li}>
          <RadioButton checked={value === 'female'} onClick={() => onChange('female')} />
          <span className={styles.text}>Женский</span>
        </li>
      </ul>
    </div>
  )
}
