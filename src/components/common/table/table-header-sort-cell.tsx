import { SortOrderIcon } from '../../../assets/svgs/sort-order-icon'

interface TableHeaderSortCellProps
  extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  colSpan?: number
  onClick?: () => void
}

export const TableHeaderSortCell = ({
  children,
  leftIcon,
  rightIcon,
  colSpan,
  onClick,
  ...props
}: TableHeaderSortCellProps) => {
  return (
    <th
      scope="col"
      colSpan={colSpan}
      className="px-6 py-3 truncate max-w-xs font-bold cursor-pointer"
      onClick={onClick}
      {...props}
    >
      <div className="flex flex-row justify-between items-center ">
        {leftIcon}
        {children}
        {rightIcon ?? <SortOrderIcon height={24} width={24} />}
      </div>
    </th>
  )
}
