type SortOrder = 'asc' | 'desc'

export const sortArray = <T extends { [key: string]: any }>(
  array: T[],
  key: keyof T,
  order: SortOrder = 'asc'
): T[] => {
  return [...array].sort((a: T, b: T) => {
    const valueA = a[key]
    const valueB = b[key]

    let comparison = 0

    if (typeof valueA === 'string' && typeof valueB === 'string')
      comparison = valueA.localeCompare(valueB)
    else if (valueA < valueB) comparison = -1
    else if (valueA > valueB) comparison = 1

    return order === 'asc' ? comparison : -comparison
  })
}
