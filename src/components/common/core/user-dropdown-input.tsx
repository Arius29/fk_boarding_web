import { IconUsersPlus } from '@tabler/icons-react'
import { useState, useMemo, useCallback, forwardRef } from 'react'
import { useEmployeeApi } from '../../../hooks/use-employee-api'
import { useQuery } from 'react-query'
import { Avatar } from '../layout/avatar'
import { Employee } from '../../../interfaces/employee'
import { EMPLOYEES_MOCKS } from '../../../mocks/employee-mocks'
import { useDebounce } from 'use-debounce'

const filterEmployees = (employees: Employee[], searchValue: string) => {
  if (!searchValue) return employees
  return employees.filter((process) => {
    return `${process.firstName} ${process.lastName}`
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  })
}

interface UserDropdownProps {
  containerStyles?: React.CSSProperties
}

export const UserDropdownInput = forwardRef<
  HTMLInputElement,
  UserDropdownProps
>(({ containerStyles }, ref) => {
  const [searchValue, setSearchValue] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  )
  const { getEmployeeList } = useEmployeeApi()

  const employeeListQuery = useQuery(
    ['employeeList'],
    () => getEmployeeList('750'),
    { staleTime: 300000, cacheTime: 600000 }
  )

  const [debouncedSearchValue] = useDebounce(searchValue, 300)

  const filteredEmployees = useMemo(() => {
    return filterEmployees(
      employeeListQuery.data || EMPLOYEES_MOCKS,
      debouncedSearchValue
    )
  }, [employeeListQuery.data, debouncedSearchValue])

  const handleSelectEmployee = useCallback(
    (employeeId: number) => {
      const employee = filteredEmployees.find(
        (employee) => employee.id === employeeId
      )
      if (!employee) return
      const employeeName = `${employee.firstName} ${employee.lastName}`
      setSearchValue(employeeName)
      setSelectedEmployeeId(employeeId)
      setShowModal(false)
    },
    [filteredEmployees]
  )

  const onChangeSearchValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!showModal) setShowModal(true)
      setSearchValue(e.target.value)
    },
    [showModal]
  )

  return (
    <div
      className="flex flex-row items-center gap-2 relative"
      style={{ ...containerStyles }}
    >
      <IconUsersPlus stroke={2} className="w-6 h-6 text-purple-600" />
      <input className="hidden" value={`${selectedEmployeeId}`} ref={ref} />
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
      {showModal && filteredEmployees.length > 0 && (
        <div
          id="dropdownUsers"
          className="absolute z-40 bg-white rounded-lg shadow w-full top-full"
        >
          <ul
            className="h-40 overflow-y-auto text-gray-700"
            aria-labelledby="dropdownUsersButton"
          >
            {filteredEmployees.map((employee) => (
              <li
                key={employee.id}
                onClick={() => handleSelectEmployee(employee.id)}
              >
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-100 gap-2 last:rounded-lg"
                >
                  <Avatar
                    name={`${employee.firstName} ${employee.lastName}`}
                    size="xs"
                  />
                  {`${employee.firstName} ${employee.lastName}`}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
})
