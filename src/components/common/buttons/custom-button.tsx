interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: ButtonVariant
  children: React.ReactNode
}

enum ButtonVariant {
  default = 'default',
  text = 'text',
  danger = 'danger',
  unfilled = 'unfilled',
  disabled = 'disabled',
}

const defualtClassName =
  'transition ease-in-out duration-300 font-bold py-2 px-4 rounded'

const variantStyles = {
  default:
    ' bg-light-blue-400 hover:bg-sky-600 text-white border border-light-blue-400 hover:border-sky-600',
  text: ' text-gray-700',
  danger: ' bg-red-600 text-white',
  unfilled:
    ' text-light-blue-400 border border-light-blue-400 hover:text-sky-600 hover:border-sky-600',
  disabled: ' bg-gray-200 text-gray-600 border border-gray cursor-not-allowed',
}

export const CustomButton = ({
  className,
  children,
  variant = ButtonVariant.default,
  ...props
}: CustomButtonProps) => {
  const buttomClassName = `${defualtClassName} ${className} ${variantStyles[variant]}`

  return (
    <button className={buttomClassName} {...props} disabled={props.disabled}>
      {children}
    </button>
  )
}
