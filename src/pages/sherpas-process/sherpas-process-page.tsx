import { useRef, useState } from 'react'
import { PrimaryButton } from '../../components/common/buttons/primary-button'
import { Title } from '../../components/common/core/title'
import { SearchBar } from '../../components/common/search/search-bar'
import { useTablePagination } from '../../hooks/use-table-pagination'
import { ProcessUser } from './interfaces/process-user'
import { TablePagination } from '../../components/common/table/table-pagination'
import { TableSherpasProcess } from './components/table-sherpas-process'
import { sortArray, sortArrayDoubleKey } from '../../utils/array-utils'
import { EditProcessSherpaModal } from './components/edit-process-sherpa-modal'
import { useProcessUserApiQuery } from '../../hooks/use-process-user-api-query'
import { useProcessApiQuery } from '../../hooks/use-process-api-query'

type SortOrder = 'asc' | 'desc'

const filterSherpasProcess = (
  processes: ProcessUser[],
  searchValue: string
) => {
  return processes.filter((tag) => {
    return (
      tag.user?.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      tag.user?.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      tag.process?.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      tag.startedBy?.toLowerCase().includes(searchValue.toLowerCase()) ||
      tag.finishedBy?.toLowerCase().includes(searchValue.toLowerCase())
    )
  })
}

const sortProcesses = (
  key: keyof ProcessUser,
  processes: ProcessUser[],
  sortConfig: SortOrder
) => {
  switch (key) {
    case 'userId':
      return sortArrayDoubleKey(processes, 'user', 'name', sortConfig)
    case 'processId':
      return sortArrayDoubleKey(processes, 'process', 'name', sortConfig)
    case 'finishedBy':
      return sortArrayDoubleKey(processes, 'finisher', 'name', sortConfig)
    case 'startedBy':
      return sortArrayDoubleKey(processes, 'starter', 'name', sortConfig)
    default:
      return sortArray(processes, key, sortConfig)
  }
}

const initialStateProcess: ProcessUser = {
  processId: 0,
  userId: '',
  startedOn: '',
  finishedOn: '',
  startedBy: '',
  finishedBy: '',
  status: 0,
}

let selectedProcess: ProcessUser

export const SherpasProcessPage = () => {
  const [showModal, setShowModal] = useState(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const { processes } = useProcessApiQuery({})
  const {
    processesUsers,
    setProcessesUsers,
    mutationAddProcessUser,
    mutationEditProcessUser,
    mutationDeleteProcessUser,
  } = useProcessUserApiQuery({
    proccesses: processes,
    includeProcess: true,
    includeUsers: true,
  })
  const searchBarRef = useRef<HTMLInputElement>(null)
  const sortConfig = useRef<SortOrder>('asc')
  const isEditing = useRef<boolean>(false)

  const handleSortColumn = (key: keyof ProcessUser) => {
    sortConfig.current = sortConfig.current == 'asc' ? 'desc' : 'asc'
    setProcessesUsers(sortProcesses(key, processesUsers, sortConfig.current))
  }

  const handleToggle = () => setShowModal(!showModal)
  const handleSearch = (query: string) => {
    setSearchValue(query)
  }

  const handleSelectProcess = (processId: number, userId: string) => {
    const process = processesUsers?.find(
      (process) => process.processId === processId && process.userId === userId
    )
    if (!process) return
    selectedProcess = process
    isEditing.current = true
    handleToggle()
  }

  const handleFormProcessUser = (process: ProcessUser) => {
    if (isEditing.current) mutationEditProcessUser.mutate(process)
    mutationAddProcessUser.mutate(process)
    handleToggle()
  }

  const handleDeleteProcess = (processId: number, userId: string) => {
    const process = processesUsers?.find(
      (process) => process.processId === processId && process.userId === userId
    )
    if (!process) return
    mutationDeleteProcessUser.mutate(process)
  }

  const { current, totalPages, handleChangePage, paginatedItems } =
    useTablePagination({
      items: filterSherpasProcess(processesUsers, searchValue),
      itemsPerPage: 10,
      currentPage: 1,
    })

  return (
    <>
      <Title>Sherpas Process</Title>
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
        <PrimaryButton
          onClick={() => {
            isEditing.current = false
            handleToggle()
          }}
        >
          Add
        </PrimaryButton>
      </header>
      <section
        className="sm:rounded-lg flex-1 flex flex-col justify-between items-center"
        style={{ maxHeight: 'calc(100vh - 208px)' }}
      >
        <div className="flex-1 w-full overflow-y-auto">
          <TableSherpasProcess
            processes={paginatedItems}
            handleSortColumn={handleSortColumn}
            handleSelectProcessUser={handleSelectProcess}
            handleDeleteProcessUser={handleDeleteProcess}
          />
        </div>
        <TablePagination
          currentPage={current}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
      </section>
      {showModal && (
        <EditProcessSherpaModal
          isEditing={isEditing.current}
          handleToggle={handleToggle}
          processes={processes}
          processUser={
            isEditing.current ? selectedProcess : initialStateProcess
          }
          handleProcessForm={handleFormProcessUser}
        />
      )}
    </>
  )
}
