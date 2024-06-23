// todo: Move function to common utils folder later during refactoring.
export function convertToDDMMYYYY(date: string) {
  return new Date(date).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
