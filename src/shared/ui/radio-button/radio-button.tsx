import styles from './radio.module.css'
import { RadiobuttonActiveIcon,RadiobuttonEmptyIcon } from '../icons'

interface RadioButtonProps {
    checked: boolean
    onClick: () => void

}


export const RadioButton = ({checked, onClick}:RadioButtonProps) => {

    return (
      <button type="button" className={styles.container} onClick={onClick}>
        {checked ? (
          <RadiobuttonActiveIcon className={styles.filledRadio} />
        ) : (
          <RadiobuttonEmptyIcon />
        )}
      </button>
    )
}
