import styles from './radio.module.css'
import { RadiobuttonActiveIcon,RadiobuttonEmptyIcon } from '../icons'

interface RadioButtonProps {
    checked: boolean
    onChange: () => void

}


export const RadioButton = ({checked, onChange}:RadioButtonProps) => {

    return (
<div className={styles.container} onClick={onChange}>
  {checked ? (
    <RadiobuttonActiveIcon className={styles.filledRadio} />
  ) : (
    <RadiobuttonEmptyIcon className={styles.emptyRadio} />
  )}
</div>
    )
}