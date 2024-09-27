import { useProcessApiQuery } from '../../hooks/use-process-api-query'
import { groupBy } from '../../utils/array-utils'
import { WorkItem } from './interfaces/work-item'
import { WorkItemRecipient } from './interfaces/work-item-recipient'
import { WorkItemReporter } from './interfaces/work-item-reporter'
import { WorkItemListItem } from './components/work-item-list-item'
import { IconChevronsRight, IconPlus } from '@tabler/icons-react'
import { WorkItemNav } from './components/work-item-nav'
import { Toaster } from 'sonner'
import { SearchBar } from '../../components/common/search/search-bar'
import { useRef, useState } from 'react'

const filterWorkItems = (workItems: WorkItem[], searchValue: string) => {
  return workItems.filter((workItem) => {
    return (
      workItem.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      workItem.recipients?.some((r: WorkItemRecipient) =>
        r.user?.name.toLowerCase().includes(searchValue.toLowerCase())
      ) ||
      workItem.reporters?.some((r: WorkItemReporter) =>
        r.user?.name.toLowerCase().includes(searchValue.toLowerCase())
      ) ||
      workItem.process?.name.toLowerCase().includes(searchValue.toLowerCase())
    )
  })
}

const groupByCategory = (workItems: WorkItem[]) => {
  return groupBy(workItems, 'categoryId')
}

export const WorkItemsPage = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedProcessId, setSelectedProcessId] = useState<number>(0)
  const searchBarRef = useRef<HTMLInputElement>(null)
  const { processes } = useProcessApiQuery({
    includeCategories: true,
    includeWorkItems: true,
    includeUsers: true,
    includeTags: true,
    includeProcessUsers: true,
    omitWorkItemsAbandoned: true,
  })

  const handleSearch = (query: string) => {
    setSearchValue(query)
  }

  const process = selectedProcessId
    ? processes.find((p) => p.id === selectedProcessId)
    : processes[0]
  const workItemsMap = groupByCategory(
    filterWorkItems(process?.workItems || [], searchValue)
  )

  return (
    <>
      <Toaster position="top-right" richColors />
      <WorkItemNav />
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
        <div>Filters</div>
      </header>
      <section className="h-[calc(100vh-11rem)] flex flex-col overflow-y-auto mt-4">
        <div className="relative group">
          <h2 className="text-2xl mb-4 flex flex-row items-center gap-4">
            {process?.name}{' '}
            <IconChevronsRight
              stroke={2}
              className="w-6 h-6 transition-transform ease-linear duration-150 hover:scale-110 active:scale-110 focus:scale-110"
            />
          </h2>
          <ul className="group-hover:h-20 transition-h delay-0 duration-200 ease-in-out h-0 overflow-hidden absolute z-40 bg-white w-60 top-full rounded">
            {processes.map((p) => (
              <li key={p.id}>
                <a
                  className="text-xl mb-4 flex flex-row items-center gap-4 hover:text-blue-550 active:text-blue-550 focus:text-blue-550"
                  href="#"
                  onClick={() => setSelectedProcessId(p.id)}
                >
                  {p?.name}
                  <IconChevronsRight
                    stroke={2}
                    className="w-6 h-6 transition-transform ease-linear duration-150 hover:scale-110 active:scale-110 focus:scale-110"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-1 flex-row flex-nowrap gap-4">
          {Array.from(workItemsMap.entries()).map(([key, workItems]) => (
            <div key={key} className="bg-gray-50 rounded-md">
              <div className="sticky top-0 z-20 p-4 bg-gray-50 rounded-md">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  {process?.categories?.find((c) => c.id === key)?.name}
                </h3>
                <button className="flex flex-row items-center gap-2 text-lg rounded-md border border-gray-200 bg-white text-blue-550 py-2 px-4 w-full transition-transform ease-linear duration-150 delay-0 hover:scale-105 active:scale-105 focus:scale-105">
                  <IconPlus stroke={2} />
                  Add task
                </button>
              </div>
              <ul key={key} className="flex flex-col gap-4 p-4">
                {workItems.map((workItem) => (
                  <WorkItemListItem key={workItem.id} workItem={workItem} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
