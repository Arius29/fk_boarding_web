import { IconUsersPlus } from '@tabler/icons-react'
import { useState, useMemo, useCallback } from 'react'
//import { useEmployeeApi } from '../../../hooks/use-employee-api'
//import { useQuery } from 'react-query'
import { Avatar } from '../layout/avatar'
//import { Employee } from '../../../interfaces/employee'
import { useDebounce } from 'use-debounce'
import { Control, Controller } from 'react-hook-form'
import { ProcessUser } from '../../../pages/sherpas-process/interfaces/process-user'
import { useUsersApiQuery } from '../../../hooks/use-users-api-query'
import { User } from '../../../pages/sherpas/interfaces/user'

// const filterEmployees = (employees: Employee[], searchValue: string) => {
//   if (!searchValue) return employees
//   return employees.filter((process) => {
//     return `${process.firstName} ${process.lastName}`
//       .toLowerCase()
//       .includes(searchValue.toLowerCase())
//   })
// }

const filterUsers = (users: User[], searchValue: string) => {
  if (!searchValue) return users
  return users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.email.toLowerCase().includes(searchValue.toLowerCase())
    )
  })
}

const validations = {
  userId: {
    required: { value: true, message: 'The user is required.' },
    min: {
      value: 1,
      message: 'The user is required.',
    },
  },
}

interface UserDropdownProps {
  containerStyles?: React.CSSProperties
  control: Control<ProcessUser>
  error?: string
}

export const UserDropdownInput = ({
  containerStyles,
  control,
  error,
}: UserDropdownProps) => {
  const [searchValue, setSearchValue] = useState('')
  const [showModal, setShowModal] = useState(false)
  // const { getEmployeeList } = useEmployeeApi()

  // const employeeListQuery = useQuery(
  //   ['employeeList'],
  //   () => getEmployeeList('750'),
  //   { staleTime: 300000, cacheTime: 600000 }
  // )

  const { users } = useUsersApiQuery()

  const [debouncedSearchValue] = useDebounce(searchValue, 300)

  // const filteredEmployees = useMemo(() => {
  //   return filterEmployees(employeeListQuery.data || [], debouncedSearchValue)
  // }, [employeeListQuery.data, debouncedSearchValue])

  const filteredUsers = useMemo(() => {
    return filterUsers(users || [], debouncedSearchValue)
  }, [users, debouncedSearchValue])

  const handleSelectUser = useCallback(
    (userId: string) => {
      const user = filteredUsers.find((user) => user.id === userId)
      if (!user) return
      //const employeeName = `${employee.firstName} ${employee.lastName}`
      setSearchValue(user.name)
      setShowModal(false)
    },
    [filteredUsers]
  )

  const onChangeSearchValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!showModal) setShowModal(true)
      setSearchValue(e.target.value)
    },
    [showModal]
  )

  return (
    <Controller
      name="user"
      rules={validations.userId}
      control={control}
      render={({ field }) => (
        <>
          <div
            className="flex flex-row items-center gap-2 relative"
            style={{ ...containerStyles }}
          >
            <IconUsersPlus stroke={2} className="w-6 h-6 text-purple-600" />
            <input
              id="dropdownUsersButton"
              data-dropdown-toggle="dropdownUsers"
              data-dropdown-placement="bottom"
              type="text"
              placeholder="Employee"
              autoComplete="off"
              className="ring-0 outline-none border-b p-2 inline-block w-full"
              onChange={onChangeSearchValue}
              onClick={() => setShowModal(!showModal)}
              value={searchValue}
            />
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
                        field.onChange(
                          filteredUsers.find((user) => user.id === employee.id)
                        )
                      }}
                    >
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 gap-2 last:rounded-lg"
                      >
                        <Avatar
                          //name={`${employee.firstName} ${employee.lastName}`}
                          name={employee.name}
                          size="xs"
                        />
                        {/* {`${employee.firstName} ${employee.lastName}`} */}
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
      )}
    />
  )
}
