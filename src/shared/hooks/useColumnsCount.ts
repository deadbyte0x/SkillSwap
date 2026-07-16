// shared/lib/hooks/useColumnsCount.ts
import { useEffect, useState, type RefObject } from 'react'

export function useColumnsCount(
  containerRef: RefObject<HTMLElement>,
  cardMinWidth = 300,
  gap = 24,
) {
  const [columns, setColumns] = useState(3)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const calculate = (width: number) => {
      const count = Math.floor((width + gap) / (cardMinWidth + gap))
      setColumns(Math.max(1, count))
    }

    calculate(el.offsetWidth)

    const observer = new ResizeObserver(([entry]) => {
      calculate(entry.contentRect.width)
    })
    observer.observe(el)

    return () => observer.disconnect()
  }, [containerRef, cardMinWidth, gap])

  return columns
}