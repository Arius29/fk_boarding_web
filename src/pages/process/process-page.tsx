import { useRef, useState } from 'react'
import { PrimaryButton } from '../../components/common/buttons/primary-button'
import { Title } from '../../components/common/core/title'
import { SearchBar } from '../../components/common/search/search-bar'
import { TablePagination } from '../../components/common/table/table-pagination'
import { Process } from './interfaces/process'
import { EditProcessModal } from './components/edit-process-modal'
import { sortArray, sortArrayDoubleKey } from '../../utils/array-utils'
import { useTablePagination } from '../../hooks/use-table-pagination'
import { TableProcess } from './components/table-process'
import { processMocks } from '../../mocks/process-mocks'
import { CreateProcess } from './interfaces/create-process'
import { Type } from '../sherpas/interfaces/user'
import { useMsal } from '@azure/msal-react'
import { EditProcess } from './interfaces/edit-process'

const initialStateProcess: Process = {
  id: 0,
  name: '',
  description: '',
  createdBy: '',
  createdOn: '',
}

type SortOrder = 'asc' | 'desc'

const filterProcesses = (processes: Process[], searchValue: string) => {
  return processes.filter((process) => {
    return (
      process.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      process.description.toLowerCase().includes(searchValue.toLowerCase())
    )
  })
}

export const ProcessPage = () => {
  const [showModal, setShowModal] = useState(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedProcess, setSelectedProcess] =
    useState<Process>(initialStateProcess)
  const [processes, setProcesses] = useState<Process[]>(processMocks)
  const sortConfig = useRef<SortOrder>('asc')
  const searchBarRef = useRef<HTMLInputElement>(null)
  const isEditing = useRef<boolean>(false)
  const { accounts } = useMsal()
  const account = accounts[0]

  const handleToggle = () => setShowModal(!showModal)

  const handleSelectProcess = (id: number) => {
    const process = processes.find((process) => process.id === id)
    if (!process) return
    setSelectedProcess(process)
    isEditing.current = true
    handleToggle()
  }

  console.log(account)

  const handleSortColumn = (key: keyof Process) => {
    sortConfig.current = sortConfig.current == 'asc' ? 'desc' : 'asc'
    switch (key) {
      case 'createdBy':
        setProcesses(
          sortArrayDoubleKey(processes, 'creator', 'name', sortConfig.current)
        )
        break
      default:
        setProcesses(sortArray(processes, key, sortConfig.current))
        break
    }
  }

  const handleAddProcess = (process: Process) => {
    const createProcess: CreateProcess = {
      name: process.name,
      description: process.description,
      createdBy: account?.homeAccountId,
      createdOn: new Date().toISOString(),
      avatar: '',
      email: account?.username,
      type: Type.Azure,
      userName: account?.name,
    }
    console.log(createProcess)
  }

  const handleEditProcess = (process: Process) => {
    const editProcess: EditProcess = {
      id: process.id,
      name: process.name,
      description: process.description,
    }

    console.log(editProcess)
  }

  const handleDeleteProcess = (id: number) => {
    console.log(id)
  }

  const handleSearch = (query: string) => {
    setSearchValue(query)
  }

  const { current, totalPages, handleChangePage, paginatedItems } =
    useTablePagination({
      items: filterProcesses(processes, searchValue),
      itemsPerPage: 10,
      currentPage: 1,
    })

  return (
    <>
      <Title>Process</Title>
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
          <TableProcess
            processes={paginatedItems}
            handleSelectProcess={handleSelectProcess}
            handleSortColumn={handleSortColumn}
            handleDeleteProcess={handleDeleteProcess}
          />
        </div>
        <TablePagination
          currentPage={current}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
      </section>
      {showModal && (
        <EditProcessModal
          isEditing={isEditing.current}
          handleToggle={handleToggle}
          process={isEditing.current ? selectedProcess : initialStateProcess}
          handleProcessForm={
            isEditing.current ? handleEditProcess : handleAddProcess
          }
        />
      )}
    </>
  )
}
