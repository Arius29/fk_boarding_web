import { useRef, useState } from 'react'
import { Title } from '../../components/common/core/title'
import { SearchBar } from '../../components/common/search/search-bar'
import { User } from './interfaces/user'
import { userMocks } from '../../mocks/user-mocks'
import { UserBadge } from './components/user-badge'
import { Link } from 'react-router-dom'
import {
  IconBabyCarriage,
  IconCake,
  IconDeviceGamepad3,
  IconDeviceMobile,
  IconHomeFilled,
  IconId,
  IconMailFilled,
  IconMapPin,
  IconPencil,
} from '@tabler/icons-react'
import { UserDetailItem } from './components/user-detail-item'
import { useTablePagination } from '../../hooks/use-table-pagination'
import { TablePagination } from '../../components/common/table/table-pagination'
import {
  ADD_SHERPA_PAGE_URL,
  EDIT_SHERPA_PAGE_URL,
} from '../../routes/routes-config'
import { PrimaryLink } from '../../components/common/links/primary-link'

const filterUsers = (users: User[], searchValue: string) => {
  return users.filter((process) => {
    return process.name.toLowerCase().includes(searchValue.toLowerCase())
  })
}

export const SherpasPage = () => {
  const [users, setUsers] = useState<User[]>(userMocks)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [searchValue, setSearchValue] = useState<string>('')
  const searchBarRef = useRef<HTMLInputElement>(null)

  const handleSelectUser = (id: string) => {
    const user = users.find((user) => user.id === id)
    if (!user) return
    setSelectedUser(user)
  }

  const handleSearch = (query: string) => {
    setSearchValue(query)
  }

  const src = selectedUser?.avatar
    ? selectedUser.avatar
    : `https://ui-avatars.com/api/?name=${selectedUser?.name.replace(' ', '+') ?? ''}&background=random`

  const { current, totalPages, handleChangePage, paginatedItems } =
    useTablePagination({
      items: filterUsers(users, searchValue),
      itemsPerPage: 20,
      currentPage: 1,
    })

  return (
    <>
      <Title>Sherpas</Title>
      <header className="flex flex-row flex-nowrap justify-between items-center mb-8">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSearch(searchBarRef.current?.value || '')
          }}
        >
          <SearchBar
            onBlur={(e) => handleSearch(e.target.value)}
            ref={searchBarRef}
          />
        </form>
        <PrimaryLink to={ADD_SHERPA_PAGE_URL}>Add</PrimaryLink>
      </header>
      <section className="grid grid-cols-8 h-full">
        <div className="col-span-6 h-full flex flex-col justify-between">
          <ul className="flex flex-row flex-wrap gap-2 items-start justify-start h-fit">
            {paginatedItems.map((user) => (
              <li
                key={user.id}
                onClick={() => handleSelectUser(user.id)}
                className="w-60"
              >
                <UserBadge
                  user={user}
                  isActive={selectedUser?.id === user.id}
                />
              </li>
            ))}
          </ul>
          <div className="mx-auto">
            <TablePagination
              currentPage={current}
              totalPages={totalPages}
              handleChangePage={handleChangePage}
            />
          </div>
        </div>
        <aside className="col-span-2 bg-gray-50 rounded">
          <header
            style={{
              backgroundImage: `url('${src}')`,
            }}
            className="relative bg-no-repeat bg-cover bg-center w-full p-9 text-white grid place-items-center rounded-t"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 z-10"></div>
            <div className="relative w-fit z-20 border border-white rounded-full">
              <img
                src={src}
                alt={`Profile picture of ${selectedUser?.name}`}
                className="w-40 h-40 rounded-full object-center"
              />
              <Link
                to={EDIT_SHERPA_PAGE_URL.replace(':id', selectedUser?.id || '')}
                className="absolute top-0 right-0 translate-y-2 border border-white p-2 bg-black rounded-full bg-opacity-30 ring-0 outline-none z-30 transition-transform delay-0 duration-150 ease-linear hover:scale-110 active:scale-110 focus:scale-110"
              >
                <IconPencil stroke={2} className="w-5 h-5 text-white" />
              </Link>
            </div>
            <h2 className="text-2xl z-20">{selectedUser?.name}</h2>
            <h3 className="z-20">{selectedUser?.position}</h3>
          </header>
          <div className="p-8 flex flex-col space-y-2">
            <UserDetailItem
              label="Uid"
              value={selectedUser?.uid}
              icon={<IconId stroke={2} className="text-green-600 w-7 h-7" />}
            />
            <UserDetailItem
              label="Email"
              value={selectedUser?.email}
              icon={<IconMailFilled className="text-red-600 w-7 h-7" />}
            />
            <UserDetailItem
              label="Phone number"
              value={selectedUser?.phoneNumber}
              icon={
                <IconDeviceMobile
                  stroke={2}
                  className="text-purple-600 w-7 h-7"
                />
              }
            />
            <UserDetailItem
              label="BirthDate"
              value={selectedUser?.birthDate}
              icon={<IconCake stroke={2} className="text-orange-600 w-7 h-7" />}
            />
            <UserDetailItem
              label="Address"
              value={selectedUser?.address}
              icon={<IconMapPin stroke={2} className="text-blue-600 w-7 h-7" />}
            />
            <UserDetailItem
              label="Marital status"
              value={selectedUser?.matiralStatus}
              icon={<IconHomeFilled className="text-yellow-500 w-7 h-7" />}
            />
            <UserDetailItem
              label="Have children"
              value={selectedUser?.haveChildren ? 'Yes' : 'No'}
              icon={
                <IconBabyCarriage
                  stroke={2}
                  className="text-teal-500 w-7 h-7"
                />
              }
            />
            <UserDetailItem
              label="Hobbies"
              value={selectedUser?.hobbies}
              icon={
                <IconDeviceGamepad3
                  stroke={2}
                  className="text-pink-500 w-7 h-7"
                />
              }
            />
          </div>
        </aside>
      </section>
    </>
  )
}
