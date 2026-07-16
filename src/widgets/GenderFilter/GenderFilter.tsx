import { RadioButton } from "@/shared/ui/radio-button"
import { useState } from "react"
import styles from './genderFilter.module.css'

interface FilterProps {
    onChange: (value: FilterValue) => void
}

type FilterValue = "unknown" | "male" | "female"

export const GenderFilter = ({ onChange }: FilterProps) => {
  const [selected, setSelected] = useState<FilterValue>("unknown");

  const handleClick = (value: FilterValue) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div>
    <h3 className={styles.label}>Пол автора</h3>
    <ul className={styles.container} >
      <li className={styles.li}>
        <RadioButton
          checked={selected === "unknown"}
          onClick={() => handleClick("unknown")}
        />
        <span className={styles.text}>Не имеет значения</span>
      </li>

      <li className={styles.li}>
        <RadioButton
          checked={selected === "male"}
          onClick={() => handleClick("male")}
        />
        <span className={styles.text}>Мужской</span>
      </li>

      <li className={styles.li}>
        <RadioButton
          checked={selected === "female"}
          onClick={() => handleClick("female")}
        />
        <span className={styles.text}>Женский</span>
      </li>
    </ul>
    </div>
  );
};
