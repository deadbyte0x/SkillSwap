

/** Форматирует дату в читаемый вид */
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}

/** Обрезает строку до maxLength символов */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '...'
}

/** Генерирует уникальный id */
export function generateId(): string {
  return crypto.randomUUID()
}

// возвращает правильное слово: год/года/лет
export const getAgeWord = (age: number): string => {
  const lastTwo = age % 100;
  const lastOne = age % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return 'лет';
  if (lastOne === 1) return 'год';
  if (lastOne >= 2 && lastOne <= 4) return 'года';
  return 'лет';
};
