import { Toaster } from 'sonner'
import { WorkItemNav } from './components/work-item-nav'
import { Title } from '../../components/common/core/title'
import { SearchBar } from '../../components/common/search/search-bar'
import { useRef, useState } from 'react'
import { useTablePagination } from '../../hooks/use-table-pagination'
import { useWorkItemApiQuery } from '../../hooks/use-work-item-api-query'
import { TablePagination } from '../../components/common/table/table-pagination'
import { TableWorkItemRecipients } from './components/table-work-item-recipients'
import { WorkItem } from './interfaces/work-item'
import { WorkItemRecipient } from './interfaces/work-item-recipient'
import { sortArray } from '../../utils/array-utils'

const filterRecipients = (workItems: WorkItem[], searchValue: string) => {
  if (!searchValue) return workItems
  const searchLower = searchValue.toLowerCase()
  return workItems
    .map((workItem) => {
      const filteredRecipients = workItem.recipients?.filter((recipient) => {
        const userName = recipient.user?.name?.toLowerCase()
        const userEmail = recipient.user?.email?.toLowerCase()
        const userId = recipient.user?.id?.toLowerCase()

        return (
          (userName && userName.includes(searchLower)) ||
          (userEmail && userEmail.includes(searchLower)) ||
          (userId && userId.includes(searchLower))
        )
      })
      if (filteredRecipients && filteredRecipients.length > 0) {
        return { ...workItem, recipients: filteredRecipients }
      }
      return null
    })
    .filter(Boolean) as WorkItem[]
}

type SortOrder = 'asc' | 'desc'

const sortWorkItems = (
  key: keyof WorkItemRecipient,
  workItems: WorkItem[],
  sortOrder: SortOrder
) => {
  switch (key) {
    case 'startedOn':
    case 'finishedOn':
    case 'startedBy':
    case 'status':
    case 'finishedBy':
      return sortArray(workItems, key, sortOrder)
    case 'workItemId':
      return sortArray(workItems, 'id', sortOrder)
    case 'userId':
      return [...workItems].sort((a, b) => {
        let comparison = 0
        const aUser =
          a.recipients?.find((recipient) => recipient.user?.id)?.userId ?? ''
        const bUser =
          b.recipients?.find((recipient) => recipient.user?.id)?.userId ?? ''
        comparison = aUser.localeCompare(bUser)
        return sortOrder === 'asc' ? comparison : -comparison
      })
    default:
      return workItems
  }
}

export const WorkItemsHistoryPage = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const searchBarRef = useRef<HTMLInputElement>(null)
  const sortConfig = useRef<SortOrder>('asc')

  const { workItems, setWorkItems } = useWorkItemApiQuery({
    includeUsers: true,
    includeReporters: true,
    includeRecipients: true,
    enabled: true,
  })

  const handleSearch = (query: string) => {
    setSearchValue(query)
  }

  const handleSortColumn = (key: keyof WorkItemRecipient) => {
    sortConfig.current = sortConfig.current == 'asc' ? 'desc' : 'asc'
    setWorkItems(sortWorkItems(key, workItems, sortConfig.current))
  }

  const { current, totalPages, handleChangePage, paginatedItems } =
    useTablePagination({
      items: filterRecipients(workItems, searchValue),
      itemsPerPage: 10,
      currentPage: 1,
    })

  return (
    <>
      <Toaster position="top-right" richColors />
      <WorkItemNav />
      <Title>History</Title>
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
      </header>
      <section
        className="sm:rounded-lg flex-1 flex flex-col justify-between items-center"
        style={{ maxHeight: 'calc(100vh - 208px)' }}
      >
        <div className="flex-1 w-full overflow-y-auto">
          <TableWorkItemRecipients
            workItems={paginatedItems}
            handleSortColumn={handleSortColumn}
          />
        </div>
        <TablePagination
          currentPage={current}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
      </section>
    </>
  )
}
