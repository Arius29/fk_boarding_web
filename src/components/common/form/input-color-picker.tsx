import { forwardRef } from 'react'

interface InputColorPickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  label?: string
  includeHex?: boolean
}

export const InputColorPicker = forwardRef<
  HTMLInputElement,
  InputColorPickerProps
>(({ id, label, includeHex = false, ...props }, ref) => {
  return (
    <fieldset>
      {label && (
        <label htmlFor={id} className="block font-bold mb-2">
          {label}
        </label>
      )}
      <input
        {...props}
        ref={ref}
        type="color"
        className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
      />
      {includeHex && <p className="text-xs">{props.value}</p>}
    </fieldset>
  )
})
