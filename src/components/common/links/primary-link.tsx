import { Link } from 'react-router-dom'

interface PrimaryLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  children: React.ReactNode
  to: string
}
export const PrimaryLink = ({ to, children, ...props }: PrimaryLinkProps) => {
  return (
    <Link
      to={to}
      className="text-white inline-block bg-blue-550 ring-0 py-2 px-8 rounded outline-none hover:bg-blue-650 focus:bg-blue-650 active:bg-blue-650"
      {...props}
    >
      {children}
    </Link>
  )
}
