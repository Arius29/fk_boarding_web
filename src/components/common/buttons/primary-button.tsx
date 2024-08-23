interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}
export const PrimaryButton = ({ children, ...props }: PrimaryButtonProps) => {
  return (
    <button
      className="text-white bg-blue-550 ring-0 py-2 px-8 rounded outline-none hover:bg-blue-650 focus:bg-blue-650 active:bg-blue-650"
      {...props}
    >
      {children}
    </button>
  )
}
