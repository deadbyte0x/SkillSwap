import { useEffect, useState, type RefObject } from 'react'

// Считает, сколько карточек помещается в один ряд грида
// с колонками repeat(auto-fill, minmax(cardMinWidth, 1fr)).
// cardMinWidth и gap должны совпадать со значениями в CSS,
// иначе JS и браузер посчитают разное число колонок.
export function useColumnsCount(
  containerRef: RefObject<HTMLElement>,
  cardMinWidth = 300,
  gap = 24,
) {
  // 3 — дефолт для первого рендера, пока ширина ещё не измерена
  const [columns, setColumns] = useState(3)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Формула как у auto-fill: (ширина + gap) / (карточка + gap),
    // +gap компенсирует, что между N карточками N-1 промежутков
    const calculate = (width: number) => {
      const count = Math.floor((width + gap) / (cardMinWidth + gap))
      setColumns(Math.max(1, count)) // страховка от 0 колонок
    }

    // считаем сразу, не дожидаясь первого ресайза
    calculate(el.offsetWidth)

    // следим за размером именно контейнера (не window) —
    // ширина может меняться из-за сайдбара, а не ресайза окна
    const observer = new ResizeObserver(([entry]) => {
      calculate(entry.contentRect.width)
    })
    observer.observe(el)

    // отписка, чтобы не текла память на старый DOM-узел
    return () => observer.disconnect()
  }, [containerRef, cardMinWidth, gap])

  return columns
}
