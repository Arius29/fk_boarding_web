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

export const sortArrayDoubleKey = <T extends { [key: string]: any }>(
  array: T[],
  key1: keyof T,
  key2: string,
  order: SortOrder = 'asc'
): T[] => {
  return [...array].sort((a: T, b: T) => {
    const valueA = a[key1]?.[key2] || ''
    const valueB = b[key1]?.[key2] || ''

    let comparison = 0

    if (typeof valueA === 'string' && typeof valueB === 'string')
      comparison = valueA.localeCompare(valueB)
    else if (valueA < valueB) comparison = -1
    else if (valueA > valueB) comparison = 1

    return order === 'asc' ? comparison : -comparison
  })
}

export const filterArray = <T extends { [key: string]: any }>(
  array: T[],
  key: keyof T,
  value: any
): T[] => {
  return array.filter((item) => item[key] === value)
}

export function groupBy<T, K extends keyof T>(array: T[], key: K) {
  const map = new Map<T[K], T[]>()
  array.forEach((item) => {
    const itemKey = item[key]
    if (!map.has(itemKey)) {
      map.set(
        itemKey,
        array.filter((i) => i[key] === item[key])
      )
    }
  })
  return map
}
