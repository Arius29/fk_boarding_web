interface TablePaginationNavButtonProps {
  children: React.ReactNode
  currentPage: number
  newPage: number
  disableNumber: number
  handleChangePage: (newPage: number) => void
}

export const TablePaginationNavButton = ({
  currentPage,
  newPage,
  disableNumber,
  handleChangePage,
  children,
}: TablePaginationNavButtonProps) => {
  return (
    <button
      onClick={() => handleChangePage(newPage)}
      disabled={currentPage === disableNumber}
      aria-label="Next page"
      className="h-9 w-9 rounded-full p-1 transition-colors delay-0 duration-150 ease-in-out ring-0 outline-none grid place-items-center hover:bg-opacity-30 focus:bg-opacity-30 active:bg-opacity-30 hover:bg-blue-550 hover:text-blue-550 active:bg-blue-550 active:text-blue-550 focus:bg-blue-550 focus:text-blue-550"
    >
      {children}
    </button>
  )
}
