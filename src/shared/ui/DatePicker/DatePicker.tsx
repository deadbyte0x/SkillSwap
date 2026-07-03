import { forwardRef, useState, useEffect, useRef } from 'react'
import ReactDatePicker from 'react-datepicker'
import { ru } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'

import { CalendarIcon, ChevronDownIcon, ChevronUpIcon } from '../icons'
import { Button } from '../Button'
import styles from './DatePicker.module.css'

const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
]

const WEEKDAY_SHORT: Record<string, string> = {
  'понедельник': 'Пн',
  'вторник': 'Вт',
  'среда': 'Ср',
  'четверг': 'Чт',
  'пятница': 'Пт',
  'суббота': 'Сб',
  'воскресенье': 'Вс',
}

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
        <span className={styles.value}>{value || 'дд.мм.гггг'}</span>
        <span className={styles.icon}>
          <CalendarIcon />
        </span>
      </button>
    )
  }
)

CustomInput.displayName = 'CustomInput'

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [draft, setDraft] = useState<Date | null>(value)
  const [monthListOpen, setMonthListOpen] = useState(false)
  const [yearListOpen, setYearListOpen] = useState(false)
  const pickerRef = useRef<ReactDatePicker>(null)

  useEffect(() => {
    setDraft(value)
  }, [value])

  const handleClickOutside = () => {
    setDraft(value)
    pickerRef.current?.setOpen(false)
  }

  const handleCancel = () => {
    setDraft(null)
    onChange(null)
  }

  const handleConfirm = () => {
    onChange(draft)
    pickerRef.current?.setOpen(false)
  }

  return (
    <ReactDatePicker
      ref={pickerRef}
      selected={draft}
      onChange={(date: Date | null) => setDraft(date)}
      locale={ru}
      onClickOutside={handleClickOutside}
      customInput={<CustomInput />}
      dateFormat="dd.MM.yyyy"
      shouldCloseOnSelect={false}
      showPopperArrow={false}
      preventOpenOnFocus
      formatWeekDay={(day) => WEEKDAY_SHORT[day.toLowerCase()] ?? day}
      popperPlacement="bottom-start"
      renderCustomHeader={({
        date,
        changeMonth,
        changeYear,
      }) => {
        const currentMonth = date.getMonth()
        const currentYear = date.getFullYear()
        const years = Array.from({ length: 121 }, (_, i) => currentYear - 100 + i)

        return (
          <div className={styles.customHeader}>
            <div className={styles.dropdownWrapper}>
              <button
                type="button"
                className={styles.dropdownTrigger}
                onClick={() => {
                  setMonthListOpen((prev) => !prev)
                  setYearListOpen(false)
                }}
              >
                <span>{MONTHS[currentMonth]}</span>
                <span className={styles.chevron}>
                  {monthListOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </span>
              </button>

              {monthListOpen && (
                <div className={styles.dropdownList}>
                  {MONTHS.map((month, index) => (
                    <button
                      key={month}
                      type="button"
                      className={styles.dropdownItem}
                      onClick={() => {
                        changeMonth(index)
                        setMonthListOpen(false)
                      }}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.dropdownWrapper}>
              <button
                type="button"
                className={styles.dropdownTrigger}
                onClick={() => {
                  setYearListOpen((prev) => !prev)
                  setMonthListOpen(false)
                }}
              >
                <span>{currentYear}</span>
                <span className={styles.chevron}>
                  {yearListOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </span>
              </button>

              {yearListOpen && (
                <div className={styles.dropdownList}>
                  {years.map((year) => (
                    <button
                      key={year}
                      type="button"
                      className={styles.dropdownItem}
                      onClick={() => {
                        changeYear(year)
                        setYearListOpen(false)
                      }}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      }}
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