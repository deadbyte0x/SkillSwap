import { useState, useCallback, ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSearchQuery, performSearch, clearSearch } from '../store/searchSlice'

const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      const id = setTimeout(() => {
        callback(...args)
      }, delay)

      setTimeoutId(id)
    },
    [callback, delay, timeoutId],
  )
}

export const useSearch = () => {
  const dispatch = useAppDispatch()
  const [localQuery, setLocalQuery] = useState('')

  const searchResults = useAppSelector((state) => state.search.results)
  const loading = useAppSelector((state) => state.search.loading)
  const query = useAppSelector((state) => state.search.query)

  const debouncedSearch = useDebounce((value: string) => {
    if (value.trim()) {
      dispatch(performSearch(value))
    } else {
      dispatch(clearSearch())
    }
  }, 300)

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setLocalQuery(value)
      dispatch(setSearchQuery(value))
      debouncedSearch(value)
    },
    [dispatch, debouncedSearch],
  )

  const handleSearch = useCallback(
    (value: string) => {
      if (value.trim()) {
        dispatch(performSearch(value))
      } else {
        dispatch(clearSearch())
      }
    },
    [dispatch],
  )

  const handleClear = useCallback(() => {
    setLocalQuery('')
    dispatch(setSearchQuery(''))
    dispatch(clearSearch())
  }, [dispatch])

  return {
    query: localQuery,
    searchResults,
    loading,
    handleInput,
    handleSearch,
    handleClear,
  }
}
