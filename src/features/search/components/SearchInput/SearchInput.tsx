// src/features/search/ui/SearchInput/SearchInput.tsx
import React, { useState, ChangeEvent } from 'react'
import styles from './SearchInput.module.css'

interface SearchInputProps {
  placeholder?: string
  onInput?: (event: ChangeEvent<HTMLInputElement>) => void
  onSearch?: (value: string) => void
  initialValue?: string
  className?: string
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Искать навык',
  onInput,
  onSearch,
  initialValue = '',
  className = '',
}) => {
  const [query, setQuery] = useState(initialValue)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    if (onInput) onInput(e)
    if (onSearch) onSearch(value)
  }

  const handleClear = () => {
    setQuery('')
    if (onSearch) onSearch('')
    const input = document.getElementById('search-input')
    if (input) input.focus()
  }

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <input
        id="search-input"
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        aria-label="Поиск навыков"
      />
      {query && (
        <button
          className={styles.clearBtn}
          onClick={handleClear}
          aria-label="Очистить поиск"
          type="button"
        >
          ×
        </button>
      )}
    </div>
  )
}
