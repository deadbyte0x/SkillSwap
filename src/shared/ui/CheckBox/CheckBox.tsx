import styles from './CheckBox.module.css';
import { CheckboxDoneIcon, CheckboxEmptyIcon, CheckboxRemoveIcon } from '@/shared/ui'
import clsx from 'clsx'

interface CheckBoxProps {
  isActive: boolean;
  onClick: () => void; // функция при нажатии
  type: "minus" | "check"
}

export const CheckBox= ({ isActive, onClick, type }: CheckBoxProps) => {
  const CheckboxActiveIcon = (() => {
    switch (type) {
      case 'check':
        return CheckboxDoneIcon;
      case 'minus':
        return CheckboxRemoveIcon;
    }
  })();

  return (
    <button onClick={onClick} className={clsx(styles.button, isActive ? styles.active : '')}>
      {isActive ? <CheckboxActiveIcon /> : <CheckboxEmptyIcon />}
    </button>
  )
};
