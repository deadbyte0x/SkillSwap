import { RadioButton } from "@/shared/ui/radio-button"
import { useState } from "react"
import styles from './skills-filter.module.css'

interface FilterProps {
    onChange: (value: FilterValue) => void
}

type FilterValue = "all" | "learn" | "teach"

export const SkillsFilter = ({ onChange }: FilterProps) => {
  const [selected, setSelected] = useState<FilterValue>("all");

  const handleClick = (value: FilterValue) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <ul className={styles.container} >
      <li className={styles.li}>
        <RadioButton
          checked={selected === "all"}
          onClick={() => handleClick("all")}
        />
        <span className={styles.text}>Все</span>
      </li>

      <li className={styles.li}>
        <RadioButton
          checked={selected === "learn"}
          onClick={() => handleClick("learn")}
        />
        <span className={styles.text}>Хочу научиться</span>
      </li>

      <li className={styles.li}>
        <RadioButton
          checked={selected === "teach"}
          onClick={() => handleClick("teach")}
        />
        <span className={styles.text}>Могу научить</span>
      </li>
    </ul>
  );
};