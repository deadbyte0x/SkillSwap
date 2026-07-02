import React from 'react'
import { SearchInput } from '@/features/search'
import { useSearch } from '@/features/search/hooks/useSearch'
import styles from './CatalogPage.module.css'

export default function CatalogPage() {
  const { query, handleInput, handleSearch } = useSearch()

  return (
    <main className={styles.catalogPage}>
      <div className={styles.header}>
        <div className={styles.searchWrapper}>
          <SearchInput
            placeholder="Искать навык"
            onInput={handleInput}
            onSearch={handleSearch}
            initialValue={query}
          />
        </div>
      </div>
    </main>
  )
}
