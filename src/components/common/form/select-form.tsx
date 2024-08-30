import { forwardRef } from 'react'

interface SelectFormProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label?: string
  description?: string
  error?: string
  selectClassType?: SelectContainerClassType
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children: React.ReactNode
}

type SelectContainerClassType = 'error' | 'success'

const SELECT_CONTAINER_CLASSNAMES = {
  error:
    'flex flex-row gap-3 items-center rounded w-full border border-red-300 bg-white text-red-500 relative',
  success:
    'flex flex-row gap-3 items-center rounded border border-gray-200 hover:border-gray-950 active:border-gray-950 focus:border-gray-950 bg-white text-gray-950 hover:placeholder-gray-950 active:placeholder-gray-950 focus:placeholder-gray-950 relative',
}

export const SelectForm = forwardRef<HTMLSelectElement, SelectFormProps>(
  (
    {
      id,
      label,
      description,
      error,
      selectClassType = 'success',
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const selectContainerClassName =
      SELECT_CONTAINER_CLASSNAMES[selectClassType]

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
        <div className={selectContainerClassName}>
          {leftIcon}
          <select
            ref={ref}
            {...props}
            aria-invalid={error ? 'true' : 'false'}
            className="bg-transparent w-full inline-block p-2 ring-0 outline-none"
          >
            {children}
          </select>
          {rightIcon}
        </div>
        {description && (
          <p className="text-gray-400 text-sm w-full">{description}</p>
        )}
        {error && <p className="text-red-500 text-sm w-full">{error}</p>}
      </fieldset>
    )
  }
)
