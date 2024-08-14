interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const ModalBody = ({ children, ...props }: ModalBodyProps) => {
  return (
    <div
      {...props}
      className={props.className || 'bg-white rounded-lg p-8 z-50'}
    >
      {children}
    </div>
  )
}
