import { IconChevronDown, IconCircleFilled } from '@tabler/icons-react'
import { useState } from 'react'

interface DropDownProps {
  id: string
  title: string
  label?: string
  description?: string
  error?: string
  children: ({
    showModal,
    handleToggleModal,
  }: {
    showModal: boolean
    handleToggleModal: () => void
  }) => JSX.Element
}

export const DropDownMenu = ({
  id,
  label,
  title,
  description,
  error,
  children,
}: DropDownProps) => {
  const [showModal, setShowModal] = useState(false)
  const handleToggleModal = () => {
    setShowModal((prev) => !prev)
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
        onClick={handleToggleModal}
        className="flex flex-row items-center w-full border gap-3 relative outline-none ring-0 p-2 rounded hover:text-blue-550 active:text-blue-550 focus:text-blue-550 hover:border-blue-550 active:border-blue-550 focus:border-blue-550"
      >
        <IconCircleFilled className="w-4 h-4" />
        <span>{title}</span>
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
      {children({ showModal, handleToggleModal })}
    </div>
  )
}
