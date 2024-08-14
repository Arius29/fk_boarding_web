import { useState } from 'react'

interface TablePaginationProps<T> {
  items: T[]
  itemsPerPage?: number
  currentPage?: number
  onPageChange?: (page: number) => void
}

export const useTablePagination = <T,>({
  items,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
}: TablePaginationProps<T>) => {
  const [current, setCurrent] = useState(currentPage)
  const totalPages = Math.ceil(items.length / itemsPerPage)

  const handleChangePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    setCurrent(newPage)
    if (onPageChange) onPageChange(newPage)
  }

  const paginatedItems = items.slice(
    (current - 1) * itemsPerPage,
    current * itemsPerPage
  )

  return {
    paginatedItems,
    current,
    totalPages,
    setCurrent,
    handleChangePage,
  }
}
