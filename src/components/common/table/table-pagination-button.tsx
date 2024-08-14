interface TablePaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pageNumber: number
  currentPage: number
  handleChangePage: (newPage: number) => void
}

export const TablePaginationButton = ({
  pageNumber: index,
  currentPage,
  handleChangePage,
  ...props
}: TablePaginationButtonProps) => (
  <button
    {...props}
    onClick={() => handleChangePage(index + 1)}
    aria-label="Page number"
    className={
      currentPage === index + 1
        ? 'rounded-full w-9 h-9 p-1 bg-blue-550 bg-opacity-30 text-blue-550 ring-0 outline-none'
        : 'h-9 w-9 rounded-full p-1 transition-colors delay-0 duration-150 ease-in-out ring-0 outline-none hover:bg-opacity-30 focus:bg-opacity-30 active:bg-opacity-30 hover:bg-blue-550 hover:text-blue-550 active:bg-blue-550 active:text-blue-550 focus:bg-blue-550 focus:text-blue-550'
    }
  >
    {index + 1}
  </button>
)
