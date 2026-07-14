import React, { useState, useRef, useEffect } from 'react'
import styles from './DropdownSelect.module.css'
import { CheckboxDoneIcon, CheckboxEmptyIcon, ChevronUpIcon } from '../icons'
import { ChevronDownIcon } from '../icons'
import clsx from 'clsx'

interface DropdownProps {
  options: string[]
  placeholder?: string
  label?: string
  mode?: 'single' | 'multi'
  onChange?: (value: string | string[]) => void
}

export const DropdownSelect: React.FC<DropdownProps> = ({
  options,
  placeholder = 'Дропдаун',
  label,
  mode = 'single',
  onChange,
}) => {
  const isMulti = mode === 'multi'
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState<string[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Close on click outside of dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleOptionClick = (option: string) => {
    if (isMulti) {
      const next = value.includes(option) ? value.filter((v) => v !== option) : [...value, option]
      setValue(next)
      onChange?.(next)
    } else {
      setValue([option])
      onChange?.(option)
      setIsOpen(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}
      <div ref={wrapperRef} className={clsx(styles.inputWrapper, isOpen && styles.open)}>
        <button
          onClick={() => {
            setIsOpen(!isOpen)
          }}
          className={styles.input}
        >
          <span className={clsx(styles.inputText, value.length === 0 && styles.placeholder)}>
            {value.length === 0 ? placeholder : isMulti ? `Выбрано: ${value.length}` : value[0]}
          </span>
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
        {isOpen && (
          <ul className={styles.dropdown}>
            {options.map((opt) => (
              <li
                className={clsx(
                  styles.option,
                  isMulti && styles.optionMultiselect,
                  value.includes(opt) && styles.selected,
                )}
                onClick={() => handleOptionClick(opt)}
                key={opt}
              >
                {isMulti && (value.includes(opt) ? <CheckboxDoneIcon /> : <CheckboxEmptyIcon />)}
                <span>{opt}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
