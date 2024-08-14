interface InputFormProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
  label?: string
  type?: string
  id: string
  placeholder?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const InputForm = ({
  id,
  label = '',
  type = 'text',
  placeholder,
  leftIcon,
  rightIcon,
  ...props
}: InputFormProps) => {
  return (
    <fieldset className="rounded-md w-full max-w-xl border border-gray-200 hover:border-gray-950 active:border-gray-950 focus:border-gray-950 bg-white">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {leftIcon}
      <input
        {...props}
        aria-label={label}
        id={id}
        type={type}
        placeholder={placeholder}
        className="placeholder-gray-400 bg-transparent text-gray-950 p-2 ring-0 outline-none   hover:placeholder-gray-950 active:placeholder-gray-950 focus:placeholder-gray-950 w-full inline-block"
      />
      {rightIcon}
    </fieldset>
  )
}
