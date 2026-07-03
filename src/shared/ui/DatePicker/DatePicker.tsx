import { forwardRef, useState, useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import { ru } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'

import { CalendarIcon } from '../icons'
import { Button } from '../Button' // переиспользуемая кнопка
import styles from './DatePicker.module.css'

export type DatePickerProps = {
  value: Date | null
  onChange: (date: Date | null) => void
}

type CustomInputProps = {
  value?: string
  onClick?: () => void
}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(({ value, onClick }, ref) => {
  return (
    <button
      type="button"
      ref={ref}
      className={styles.input}
      onClick={onClick}
      aria-label="Открыть календарь"
    >
      <span className={styles.value}>{value || 'дд.мм.гггг'}</span>
      <span className={styles.icon}>
        <CalendarIcon />
      </span>
    </button>
  )
})

CustomInput.displayName = 'CustomInput'

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<Date | null>(value)

  useEffect(() => {
    setDraft(value)
  }, [value])

  const handleCancel = () => {
    setDraft(value)
    setOpen(false)
  }

  const handleConfirm = () => {
    onChange(draft)
    setOpen(false)
  }

  const WEEKDAY_SHORT: Record<string, string> = {
  'понедельник': 'Пн',
  'вторник': 'Вт',
  'среда': 'Ср',
  'четверг': 'Чт',
  'пятница': 'Пт',
  'суббота': 'Сб',
  'воскресенье': 'Вс',
}

  return (
    <ReactDatePicker
      selected={draft}
      onChange={(date: Date | null) => setDraft(date)}
      locale={ru}
      open={open}
      onCalendarOpen={() => setOpen(true)}
      onCalendarClose={() => setOpen(false)}
      onClickOutside={handleCancel}
      customInput={<CustomInput />}
      dateFormat="dd.MM.yyyy"
      shouldCloseOnSelect={false}
      showPopperArrow={false}
      popperPlacement="bottom-start"
      formatWeekDay={(day) => WEEKDAY_SHORT[day.toLowerCase()] ?? day}
    >
      <div className={styles.footer}>
        <Button variant="secondary" onClick={handleCancel}>
          Отменить
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Выбрать
        </Button>
      </div>
    </ReactDatePicker>
  )
}
