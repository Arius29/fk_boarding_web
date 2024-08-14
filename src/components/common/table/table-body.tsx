interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

export const TableBody = ({ children, ...props }: TableBodyProps) => {
  return <tbody {...props}>{children}</tbody>
}
