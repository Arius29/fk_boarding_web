interface EditButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const EditButton = ({ children, ...props }: EditButtonProps) => {
  return (
    <button
      className="text-blue-550 ring-0 outline-none hover:text-blue-650 focus:text-blue-650 active:text-blue-650"
      {...props}
    >
      {children}
    </button>
  )
}
