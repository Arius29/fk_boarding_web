import { forwardRef } from 'react'

interface TextAreaFormProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label?: string
  description?: string
  error?: string
  stylesFieldset?: React.CSSProperties
  textAreaClassType?: TextAreaContainerClassType
}

type TextAreaContainerClassType = 'error' | 'success'

const TEXT_AREA_CONTAINER_CLASSNAMES = {
  error:
    'flex flex-row p-2 gap-3 items-center rounded w-full border border-red-300 bg-white text-red-500 outline-none ring-0',
  success:
    'flex flex-row p-2 gap-3 items-center rounded border border-gray-200 hover:border-gray-950 active:border-gray-950 focus:border-gray-950 bg-white outline-none ring-0 text-gray-950 hover:placeholder-gray-950 active:placeholder-gray-950 focus:placeholder-gray-950',
}
export const TextAreaForm = forwardRef<HTMLTextAreaElement, TextAreaFormProps>(
  (
    {
      id,
      label,
      description,
      error,
      textAreaClassType = 'success',
      stylesFieldset,
      ...props
    },
    ref
  ) => {
    const textAreaContainerClassName =
      TEXT_AREA_CONTAINER_CLASSNAMES[textAreaClassType]

    return (
      <fieldset style={stylesFieldset}>
        {label && (
          <label
            htmlFor={id}
            className="text-gray-950 font-bold inline-block w-full"
          >
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          {...props}
          className={textAreaContainerClassName}
          rows={5}
          style={{ width: '100%' }}
        ></textarea>
        {description && (
          <p className="text-gray-400 text-sm w-full">{description}</p>
        )}
        {error && <p className="text-red-500 text-sm w-full">{error}</p>}
      </fieldset>
    )
  }
)
