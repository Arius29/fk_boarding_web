import { useProcessApiQuery } from '../../hooks/use-process-api-query'
import { groupBy } from '../../utils/array-utils'
import { WorkItem } from './interfaces/work-item'
import { WorkItemRecipient } from './interfaces/work-item-recipient'
import { WorkItemReporter } from './interfaces/work-item-reporter'
import { WorkItemListItem } from './components/work-item-list-item'
import { IconPlus } from '@tabler/icons-react'
import { useWorkItemApiQuery } from '../../hooks/use-work-item-api-query'

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
  const { processes } = useProcessApiQuery(
    undefined,
    true,
    true,
    true,
    true,
    true
  )

  const { workItems } = useWorkItemApiQuery()

  const process = processes[0]
  const workItemsMap = groupByCategory(
    filterWorkItems(process?.workItems || [], '')
  )

  console.log(workItems)

  return (
    <>
      <nav>
        <li>
          <a href="#">Overview</a>
        </li>
        <li>
          <a href="#">History</a>
        </li>
        <li>
          <a href="#">Calendar</a>
        </li>
      </nav>
      <section className="h-[calc(100vh-10rem)] flex flex-col overflow-y-auto">
        <h2>{process?.name}</h2>
        <div className="flex flex-1 flex-row flex-nowrap gap-4">
          {Array.from(workItemsMap.entries()).map(([key, workItems]) => (
            <div key={key} className="bg-gray-50 p-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                {process.categories?.find((c) => c.id === key)?.name}
              </h3>
              <button className="flex flex-row items-center gap-2 text-lg rounded-md border border-gray-200 bg-white text-blue-550 py-2 px-4 w-full mb-4 transition-transform ease-linear duration-150 delay-0 hover:scale-105 active:scale-105 focus:scale-105 sticky top-0 z-20">
                <IconPlus stroke={2} />
                Add task
              </button>
              <ul key={key} className="flex flex-col gap-4">
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
