import { IconUsersPlus } from '@tabler/icons-react'
import { useState, useMemo, useCallback } from 'react'
import { Avatar } from '../layout/avatar'
import { useDebounce } from 'use-debounce'
import { useUsersApiQuery } from '../../../hooks/use-users-api-query'
import { User } from '../../../pages/sherpas/interfaces/user'

const filterUsers = (users: User[], searchValue: string) => {
  if (!searchValue) return users
  return users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.email.toLowerCase().includes(searchValue.toLowerCase())
    )
  })
}

interface UserListDropdownProps {
  addUser: (user: User) => void
  containerStyles?: React.CSSProperties
  error?: string
  disabled?: boolean
}

const CLASS_NAMES = {
  base: 'ring-0 outline-none border-b p-2 inline-block w-full',
  disable:
    'ring-0 outline-none border-b border-gray-300 p-2 inline-block w-full text-gray-300',
}

export const UserListDropdownInput = ({
  addUser,
  containerStyles,
  error,
  disabled = false,
}: UserListDropdownProps) => {
  const [searchValue, setSearchValue] = useState('')
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal((prev) => !prev)
  }

  const { users } = useUsersApiQuery({})

  const [debouncedSearchValue] = useDebounce(searchValue, 300)

  const filteredUsers = useMemo(() => {
    return filterUsers(users || [], debouncedSearchValue)
  }, [users, debouncedSearchValue])

  const handleSelectUser = useCallback(
    (userId: string) => {
      const user = filteredUsers.find((user) => user.id === userId)
      if (!user) return

      addUser(user)

      setSearchValue('')
      setShowModal(false)
    },
    [filteredUsers, addUser]
  )

  const onChangeSearchValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!showModal) setShowModal(true)
      setSearchValue(e.target.value)
    },
    [showModal]
  )

  return (
    <>
      <div className="flex flex-col relative" style={{ ...containerStyles }}>
        <div className="flex flex-row items-center gap-2 relative">
          <IconUsersPlus stroke={2} className="w-6 h-6 text-purple-600" />
          <input
            id="dropdownUsersButton"
            data-dropdown-toggle="dropdownUsers"
            data-dropdown-placement="bottom"
            type="text"
            placeholder="Search for users"
            autoComplete="off"
            className={disabled ? CLASS_NAMES.disable : CLASS_NAMES.base}
            onChange={(e) => {
              if (!disabled) onChangeSearchValue(e)
            }}
            onClick={() => {
              if (!disabled) toggleModal()
            }}
            value={searchValue}
          />
        </div>

        {showModal && filteredUsers.length > 0 && (
          <div
            id="dropdownUsers"
            className="absolute z-40 bg-white rounded-lg shadow w-full top-full"
          >
            <ul
              className="h-40 overflow-y-auto text-gray-700"
              aria-labelledby="dropdownUsersButton"
            >
              {filteredUsers.map((employee) => (
                <li
                  key={employee.id}
                  onClick={() => {
                    handleSelectUser(employee.id)
                  }}
                >
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 hover:bg-gray-100 gap-2 last:rounded-lg"
                  >
                    <Avatar name={employee.name} size="xs" />
                    {employee.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm w-full">{error}</p>}
    </>
  )
}
