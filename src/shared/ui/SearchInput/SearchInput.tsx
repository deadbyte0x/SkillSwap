import React, { useState, useEffect, useRef } from 'react'
import styles from './SearchInput.module.css'
import SearchIcon from '@/shared/ui/icons/SearchIcon'
import CrossIcon from '@/shared/ui/icons/CrossIcon'
import { useDebounce } from '@/shared/hooks/useDebounce'

interface SearchInputProps {
  placeholder?: string
  onSearch?: (value: string) => void
  delay?: number
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Искать навык',
  onSearch,
  delay = 300,
}) => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedValue = useDebounce(value, delay)

  useEffect(() => {
    if (onSearch) onSearch(debouncedValue)
  }, [debouncedValue, onSearch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleClear = () => {
    setValue('')
    if (onSearch) onSearch('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      if (value) {
        handleClear()
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <SearchIcon className={styles.searchIcon} />
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {value && (
        <button
          type="button"
          className={styles.clearBtn}
          onClick={handleClear}
          aria-label="Очистить поиск"
        >
          <CrossIcon className={styles.crossIcon} />
        </button>
      )}
    </div>
  )
}
