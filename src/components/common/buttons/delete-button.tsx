interface DeleteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const DeleteButton = ({ children, ...props }: DeleteButtonProps) => {
  return (
    <button
      className="text-red-500 ring-0 outline-none hover:text-red-600 focus:text-red-600 active:text-red-600"
      {...props}
    >
      {children}
    </button>
  )
}
