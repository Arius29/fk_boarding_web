import { useProcessApiQuery } from '../../hooks/use-process-api-query'
import { groupBy } from '../../utils/array-utils'
import { WorkItem } from './interfaces/work-item'
import { WorkItemRecipient } from './interfaces/work-item-recipient'
import { WorkItemReporter } from './interfaces/work-item-reporter'

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

  const process = processes[0]
  console.log(process)
  const workItemsMap = groupByCategory(
    filterWorkItems(process?.workItems || [], '')
  )

  return (
    <>
      <nav>
        <li>
          <a href="">Overview</a>
        </li>
        <li>
          <a href="">History</a>
        </li>
        <li>
          <a href="">Calendar</a>
        </li>
      </nav>
      <section>
        <h2>{process?.name}</h2>
        <ul>
          {Array.from(workItemsMap.entries()).map(([key, workItems]) => (
            <li key={key}>
              <h3>{process.categories?.find((c) => c.id === key)?.name}</h3>
              {workItems.map((workItem) => (
                <div key={workItem.id}>{workItem.name}</div>
              ))}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
