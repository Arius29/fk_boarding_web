interface TableHeaderCellProps
  extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
}

export const TableHeaderCell = ({
  children,
  ...props
}: TableHeaderCellProps) => {
  return (
    <th
      scope="col"
      className="px-6 py-3 truncate max-w-xs font-bold"
      {...props}
    >
      {children}
    </th>
  )
}
