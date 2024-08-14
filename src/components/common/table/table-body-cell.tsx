interface TableBodyCellProps
  extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
  colSpan?: number
}

export const TableBodyCell = ({
  children,
  colSpan,
  ...props
}: TableBodyCellProps) => {
  return (
    <td className="px-6 py-4 bg-transparent" colSpan={colSpan} {...props}>
      {children}
    </td>
  )
}
