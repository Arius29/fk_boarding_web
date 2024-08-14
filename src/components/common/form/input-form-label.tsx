interface InputFormLabelProps extends React.HTMLProps<HTMLInputElement> {
  id: string
  type?: string
  label?: string
  description?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: string
  InputContainerClassType?: InputContainerClassType
}

type InputContainerClassType = 'error' | 'success'

const INPUT_CONTAINER_CLASSNAMES = {
  error:
    'flex flex-row gap-3 items-center rounded w-full max-w-xl border border-red-300 bg-white text-red-500',
  success:
    'flex flex-row gap-3 items-center rounded border border-gray-200 hover:border-gray-950 active:border-gray-950 focus:border-gray-950 bg-white text-gray-950 hover:placeholder-gray-950 active:placeholder-gray-950 focus:placeholder-gray-950',
}

export const InputFormLabel = ({
  id,
  label,
  description,
  leftIcon,
  rightIcon,
  InputContainerClassType: InputClassType = 'success',
  error,
  ...props
}: InputFormLabelProps) => {
  const inputContainerClassName = INPUT_CONTAINER_CLASSNAMES[InputClassType]

  return (
    <fieldset className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-gray-950 font-bold inline-block w-full"
        >
          {label}
        </label>
      )}
      <div className={inputContainerClassName}>
        {leftIcon}
        <input
          {...props}
          id={id}
          className="placeholder-gray-400 bg-transparent w-full inline-block p-2 ring-0 outline-none"
          aria-invalid={error ? 'true' : 'false'}
        />
        {rightIcon}
      </div>
      {description && (
        <p className="text-gray-400 text-sm w-full">{description}</p>
      )}
      {error && <p className="text-red-500 text-sm w-full">{error}</p>}
    </fieldset>
  )
}
