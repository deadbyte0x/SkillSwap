import React, { useState, useRef, useEffect } from 'react'
import styles from './DropdownInput.module.css'
import { ChevronUpIcon } from '../icons'
import { ChevronDownIcon } from '../icons'
import clsx from 'clsx'

interface DropdownInputProps {
  options: string[]
  placeholder?: string
  onChange?: (value: string) => void
  label?: string
}

export const DropdownInput: React.FC<DropdownInputProps> = ({
  options,
  placeholder = 'Дропдаун',
  onChange,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState<string | null>(null)
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
    setValue(option);
    onChange?.(option);
    setIsOpen(false);
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
          <span className={clsx(styles.inputText, !value && styles.placeholder)}>
            {value ?? placeholder}
          </span>
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
        {isOpen && (
          <ul className={styles.dropdown}>
            {options.map((opt) => (
              <li
                className={clsx(styles.option, opt === value && styles.selected)}
                onClick={() => handleOptionClick(opt)}
                key={opt}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
