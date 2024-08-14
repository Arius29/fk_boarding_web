import { useRef, useState } from 'react'

interface InputColorPickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  label?: string
  value?: string
  defaultValue?: string
  includeHex?: boolean
}

export const InputColorPicker = ({
  id,
  label,
  value,
  defaultValue = '#000000',
  includeHex = false,
  ...props
}: InputColorPickerProps) => {
  const [hexColor, setHexColor] = useState<string | null>(value || defaultValue)

  const inputRef = useRef<HTMLInputElement>(null)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHexColor(event.target.value)
  }

  return (
    <fieldset>
      {label && (
        <label htmlFor={id} className="block font-bold mb-2">
          {label}
        </label>
      )}
      <input
        {...props}
        id={id}
        name={id}
        type="color"
        className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
        value={value}
        defaultValue={defaultValue}
        ref={inputRef}
        onChange={handleChange}
      />
      {includeHex && <p className="text-xs">{hexColor}</p>}
    </fieldset>
  )
}
