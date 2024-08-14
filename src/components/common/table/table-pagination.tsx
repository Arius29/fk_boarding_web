import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { TablePaginationButton } from './table-pagination-button'
import { TablePaginationNavButton } from './table-pagination-nav-button'

interface TablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number
  totalPages: number
  handleChangePage: (newPage: number) => void
}

export const TablePagination = ({
  totalPages = 10,
  currentPage = 1,
  handleChangePage,
  ...props
}: TablePaginationProps) => {
  const showTablePaginationButton = (index: number) => {
    return (
      (index >= 0 && index < 3) ||
      index == currentPage - 1 ||
      index === totalPages - 1
    )
  }

  return (
    <footer
      {...props}
      className="flex flex-row flex-nowrap gap-3 items-center border border-gray-100 rounded-full py-2 px-6 w-fit"
    >
      <TablePaginationNavButton
        currentPage={currentPage}
        newPage={currentPage - 1}
        disableNumber={1}
        handleChangePage={handleChangePage}
      >
        <IconChevronLeft stroke={1} />
      </TablePaginationNavButton>
      <ul className="flex flex-row flex-nowrap gap-3 items-center">
        {[...Array(totalPages)].map((_, index) =>
          showTablePaginationButton(index) ? (
            <li key={index}>
              <TablePaginationButton
                pageNumber={index}
                currentPage={currentPage}
                handleChangePage={handleChangePage}
              />
            </li>
          ) : index === totalPages - 2 ? (
            <li key={index}>...</li>
          ) : null
        )}
      </ul>
      <TablePaginationNavButton
        currentPage={currentPage}
        newPage={currentPage + 1}
        disableNumber={totalPages}
        handleChangePage={handleChangePage}
      >
        <IconChevronRight stroke={1} width={24} height={24} />
      </TablePaginationNavButton>
    </footer>
  )
}
