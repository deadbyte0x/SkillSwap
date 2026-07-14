import React, { useState, useRef, useEffect, KeyboardEvent } from 'react'
import styles from './DropdownInput.module.css'
import { ChevronUpIcon } from '../icons'
import { ChevronDownIcon } from '../icons'
import clsx from 'clsx'

interface DropdownInputProps {
  /** Массив вариантов для выбора */
  options: string[]
  /** Текущее выбранное значение */
  value?: string
  /** Колбэк при выборе значения */
  onChange: (value: string) => void
  /** Текст-подсказка в поле ввода */
  placeholder?: string
  /** Текст метки над полем */
  label?: string
  /** Отключить компонент */
  disabled?: boolean
}

export const DropdownInput: React.FC<DropdownInputProps> = ({
  options,
  value = '',
  onChange,
  placeholder = 'Не указан',
  label,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => setInputValue(value), [value])

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase()),
  )

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (option: string) => {
    setInputValue(option)
    onChange(option)
    setIsOpen(false)
    setHighlightedIndex(-1)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((prev) => Math.max(prev - 1, -1))
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault()
      handleSelect(filteredOptions[highlightedIndex])
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setHighlightedIndex(-1)
    }
  }

  const toggle = () => !disabled && setIsOpen(!isOpen)

  const handleWrapperMouseDown = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('ul')) toggle()
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {label && <label className={styles.label}>{label}</label>}

      <div
        className={clsx(styles.inputWrapper, isOpen ? styles.open : '')}
        onMouseDown={handleWrapperMouseDown}
      >
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            setIsOpen(true)
            if (options.includes(e.target.value)) onChange(e.target.value)
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          disabled={disabled}
        />
        <span className={styles.arrow}>{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
      </div>

      {isOpen && (
        <ul className={styles.dropdown}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={option}
                className={clsx(styles.option, option === inputValue ? styles.selected : '', index === highlightedIndex ? styles.highlighted : '')}
                onMouseDown={(e) => {
                  e.preventDefault()
                  handleSelect(option)
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {option}
              </li>
            ))
          ) : (
            <li className={styles.noOptions}>Нет вариантов</li>
          )}
        </ul>
      )}
    </div>
  )
}
