import { forwardRef, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { ru } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'

import { CalendarIcon } from '../icons'
import styles from './DatePicker.module.css'

export type DatePickerProps = {
  value: Date | null
  onChange: (date: Date | null) => void
}

type CustomInputProps = {
  value?: string
  onClick?: () => void
}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, onClick }, ref) => {
    return (
      <button
        type="button"
        ref={ref}
        className={styles.input}
        onClick={onClick}
        aria-label="Открыть календарь"
      >
        <span className={styles.value}>
          {value || 'дд.мм.гггг'}
        </span>
        <span className={styles.icon}>
          <CalendarIcon />
        </span>
      </button>
    )
  }
)

CustomInput.displayName = 'CustomInput'

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [open, setOpen] = useState(false)

  return (
    <ReactDatePicker
      selected={value}
      onChange={(date: Date | null) => onChange(date)}
      locale={ru}
      open={open}
      onCalendarOpen={() => setOpen(true)}
      onCalendarClose={() => setOpen(false)}
      onClickOutside={() => setOpen(false)}
      customInput={<CustomInput />}
      dateFormat="dd.MM.yyyy"
      shouldCloseOnSelect={false}
      showPopperArrow={false}
    />
  )
}