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
import { useProcessApiQuery } from '../../hooks/use-process-api-query'
import { Toaster } from 'sonner'

const initialStateProcess: Process = {
  id: 0,
  name: '',
  description: '',
  createdBy: '',
  createdOn: new Date(),
}

type SortOrder = 'asc' | 'desc'

const filterProcesses = (processes: Process[], searchValue: string) => {
  return processes.filter((process) => {
    return (
      process.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      process.description?.toLowerCase().includes(searchValue.toLowerCase())
    )
  })
}

const sortProcesses = (
  key: keyof Process,
  processes: Process[],
  sortOrder: SortOrder
) => {
  switch (key) {
    case 'createdBy':
      return sortArrayDoubleKey(processes, 'creator', 'name', sortOrder)
    default:
      return sortArray(processes, key, sortOrder)
  }
}

export const ProcessPage = () => {
  const [showModal, setShowModal] = useState(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedProcess, setSelectedProcess] =
    useState<Process>(initialStateProcess)
  const sortConfig = useRef<SortOrder>('asc')
  const searchBarRef = useRef<HTMLInputElement>(null)
  const isEditing = useRef<boolean>(false)
  const {
    processes,
    setProcesses,
    mutationAddProcess,
    mutationEditProcess,
    mutationDeleteProcess,
  } = useProcessApiQuery(undefined, false, false, true, false, false, false)
  const handleToggle = () => setShowModal(!showModal)

  const handleProcessForm = (process: Process) => {
    if (isEditing.current) mutationEditProcess.mutate(process)
    else mutationAddProcess.mutate(process)
    handleToggle()
  }

  const handleDeleteProcess = (id: number) => {
    mutationDeleteProcess.mutate(id)
  }

  const handleSelectProcess = (id: number) => {
    const process = processes.find((process) => process.id === id)
    if (!process) return
    setSelectedProcess(process)
    isEditing.current = true
    handleToggle()
  }

  const handleSortColumn = (key: keyof Process) => {
    sortConfig.current = sortConfig.current == 'asc' ? 'desc' : 'asc'
    setProcesses(sortProcesses(key, processes, sortConfig.current))
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
      <Toaster position="top-right" richColors />
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
          handleProcessForm={handleProcessForm}
        />
      )}
    </>
  )
}
