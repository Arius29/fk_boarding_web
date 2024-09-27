import { IconChevronDown, IconCircleFilled } from '@tabler/icons-react'
import { useState } from 'react'

interface DropDownProps {
  id: string
  value: string
  label?: string
  description?: string
  error?: string
  includeIcon?: boolean
  disabled?: boolean
  children: ({
    showModal,
    handleToggleModal,
  }: {
    showModal: boolean
    handleToggleModal: () => void
    handleSelectValue: (value: string) => void
  }) => JSX.Element
}

const CLASS_NAMES = {
  base: 'flex flex-row items-center w-full border gap-3 relative outline-none ring-0 p-2 rounded hover:text-blue-550 active:text-blue-550 focus:text-blue-550 hover:border-blue-550 active:border-blue-550 focus:border-blue-550',
  disable:
    'flex flex-row items-center w-full border gap-3 relative outline-none ring-0 p-2 rounded text-gray-300 border-gray-300',
}

export const DropDownMenu = ({
  id,
  label,
  value,
  description,
  error,
  includeIcon = true,
  disabled = false,
  children,
}: DropDownProps) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string>(value)
  const handleToggleModal = () => {
    setShowModal((prev) => !prev)
  }

  const handleSelectValue = (value: string) => {
    setSelectedValue(value)
    handleToggleModal()
  }

  return (
    <div className="relative space-y-2">
      <label
        htmlFor={id}
        className="text-gray-950 font-bold inline-block w-full"
      >
        {label}
      </label>
      <button
        type="button"
        onClick={() => {
          if (!disabled) handleToggleModal()
        }}
        className={disabled ? CLASS_NAMES.disable : CLASS_NAMES.base}
      >
        {includeIcon && <IconCircleFilled className="w-4 h-4" />}
        <span>{selectedValue}</span>
        <IconChevronDown
          stroke={2}
          className={`absolute right-2 transform transition-transform duration-200 ${
            showModal ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      {description && (
        <p className="text-gray-400 text-sm w-full">{description}</p>
      )}
      {error && <p className="text-red-500 text-sm w-full">{error}</p>}
      {children({ showModal, handleToggleModal, handleSelectValue })}
    </div>
  )
}
