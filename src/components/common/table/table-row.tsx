interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
}
export const TableRow = ({ children, ...props }: TableRowProps) => {
  return (
    <tr
      className="odd:bg-white even:bg-gray-50 border-b border-x rounded-lg"
      {...props}
    >
      {children}
    </tr>
  )
}
