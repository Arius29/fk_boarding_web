interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const ModalHeader = ({ children, ...props }: ModalHeaderProps) => (
  <header {...props}>{children}</header>
)
