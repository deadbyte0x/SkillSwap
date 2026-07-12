import React, { useState } from 'react'
import styles from './SearchInput.module.css'
import SearchIcon from '@/shared/ui/icons/SearchIcon'
import CrossIcon from '@/shared/ui/icons/CrossIcon' 

interface SearchInputProps {
  placeholder?: string
  onSearch?: (value: string) => void
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Искать навык',
  onSearch,
}) => {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setValue(val)
    if (onSearch) onSearch(val)
  }

  const handleClear = () => {
    setValue('')
    if (onSearch) onSearch('')
  }

  return (
    <div className={styles.wrapper}>
      <SearchIcon className={styles.searchIcon} />
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {value && (
        <button className={styles.clearBtn} onClick={handleClear}>
          <CrossIcon className={styles.crossIcon} />
        </button>
      )}
    </div>
  )
}
