import { forwardRef, useState, useEffect, useRef } from 'react'
import ReactDatePicker from 'react-datepicker'
import { ru } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'

import { CalendarIcon, ChevronDownIcon, ChevronUpIcon } from '../icons'
import { Button } from '../Button'
import styles from './DatePicker.module.css'

const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

const WEEKDAY_SHORT: Record<string, string> = {
  понедельник: 'Пн',
  вторник: 'Вт',
  среда: 'Ср',
  четверг: 'Чт',
  пятница: 'Пт',
  суббота: 'Сб',
  воскресенье: 'Вс',
}

export type DatePickerProps = {
  value: Date | null
  onChange: (date: Date | null) => void
  // Текст подписи над полем, например "День рождения". Опционален для универсальности компонента
  label?: string
}

type CustomInputProps = {
  value?: string
  onClick?: () => void
}

// Кастомная кнопка-триггер вместо стандартного <input>, чтобы полностью контролировать вид поля
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

export const DatePicker = ({ value, onChange, label }: DatePickerProps) => {
  // draft — черновик выбранной даты внутри попапа, синхронизируется с value только при подтверждении
  const [draft, setDraft] = useState<Date | null>(value)
  const [monthListOpen, setMonthListOpen] = useState(false)
  const [yearListOpen, setYearListOpen] = useState(false)
  // Ref нужен, чтобы вызывать pickerRef.current.setOpen() напрямую, минуя проп open (избегаем рассинхронизации стейта)
  const pickerRef = useRef<ReactDatePicker>(null)

  // Если value меняется снаружи (например, форма сбросилась), подтягиваем актуальное значение в draft
  useEffect(() => {
    setDraft(value)
  }, [value])

  // Клик вне календаря — просто закрыть попап, откатив несохранённый черновик к последнему подтверждённому value
  const handleClickOutside = () => {
    setDraft(value)
    pickerRef.current?.setOpen(false)
  }

  // Кнопка "Сбросить" — обнуляет дату до плейсхолдера, но не закрывает календарь, чтобы можно было сразу выбрать новую дату
  const handleReset = () => {
    setDraft(null)
    onChange(null)
  }

  // Кнопка "Выбрать" — подтверждает draft как финальное значение и закрывает попап
  const handleConfirm = () => {
    onChange(draft)
    pickerRef.current?.setOpen(false)
  }

  return (
    <div className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}

      <ReactDatePicker
        ref={pickerRef}
        selected={draft}
        onChange={(date: Date | null) => setDraft(date)}
        locale={ru}
        onClickOutside={handleClickOutside}
        customInput={<CustomInput />}
        dateFormat="dd.MM.yyyy"
        // Не закрываем календарь сразу после выбора дня — пользователь подтверждает выбор явно кнопкой "Выбрать"
        shouldCloseOnSelect={false}
        showPopperArrow={false}
        // Отключаем автооткрытие по фокусу — иначе попап мог открываться сам после закрытия через кнопки (баг библиотеки)
        preventOpenOnFocus
        formatWeekDay={(day) => WEEKDAY_SHORT[day.toLowerCase()] ?? day}
        popperPlacement="bottom-start"
        renderCustomHeader={({ date, changeMonth, changeYear }) => {
          const currentMonth = date.getMonth()
          const currentYear = date.getFullYear()
          // Список годов от текущего года вниз на 120 лет
          const years = Array.from({ length: 121 }, (_, i) => currentYear - i)

          return (
            <div className={styles.customHeader}>
              {/* Дропдаун выбора месяца */}
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

              {/* Дропдаун выбора года */}
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
        {/* Футер с кнопками управления попапом, рендерится react-datepicker внутрь календаря через children */}
        <div className={styles.footer}>
          <Button variant="secondary" onClick={handleReset}>
            Сбросить
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Выбрать
          </Button>
        </div>
      </ReactDatePicker>
    </div>
  )
}
