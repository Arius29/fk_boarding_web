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

const filterRecipients = (workItems: WorkItem[], searchValue: string) => {
  if (!searchValue) return workItems
  return workItems.filter((workItem) => {
    return workItem.recipients?.some(
      (recipient) =>
        recipient.user?.name
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        recipient.user?.email
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        recipient.user?.id.toLowerCase().includes(searchValue.toLowerCase())
    )
  })
}

const handleSortColumn = (key: keyof WorkItemRecipient) => {
  return console.log(key)
}

export const WorkItemsHistoryPage = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const searchBarRef = useRef<HTMLInputElement>(null)

  const { workItems } = useWorkItemApiQuery({
    includeUsers: true,
    includeReporters: true,
    enabled: true,
  })

  const handleSearch = (query: string) => {
    setSearchValue(query)
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
