import { Calendar, Popover, Timeline, Whisper } from 'rsuite'
import 'rsuite/Calendar/styles/index.css'
import 'rsuite/Popover/styles/index.css'
import 'rsuite/Timeline/styles/index.css'
import { useWorkItemApiQuery } from '../../hooks/use-work-item-api-query'
import { getTimeDate } from '../../utils/date-utils'
import { WorkItem } from './interfaces/work-item'
import { IconCircleFilled } from '@tabler/icons-react'
import { WorkItemNav } from './components/work-item-nav'

const moreItems = (workItems: WorkItem[], moreCount: number) => {
  return (
    <li>
      <Whisper
        placement="top"
        trigger="click"
        speaker={
          <Popover>
            <Timeline
              isItemActive={(index) => {
                const workItem = workItems[index]
                const workItemtime = getTimeDate(workItem.startedOn!)
                const actualtime = getTimeDate(new Date())
                return workItemtime === actualtime
              }}
            >
              {workItems.map((workItem, index) => (
                <Timeline.Item key={index}>
                  <p className="max-w-60 text-nowrap truncate">
                    <time className="font-medium text-gray-950">
                      {getTimeDate(workItem.startedOn!)}
                    </time>
                    - {workItem.name}
                  </p>
                </Timeline.Item>
              ))}
            </Timeline>
          </Popover>
        }
      >
        <button className="text-blue-550">{moreCount} more</button>
      </Whisper>
    </li>
  )
}

const renderCell = (date: Date, workItems: WorkItem[]) => {
  const list = workItems.filter((workItem) => {
    if (!workItem.dueDate) return false
    return (
      new Date(workItem.dueDate).toLocaleDateString() ===
      date.toLocaleDateString()
    )
  })

  if (list.length > 0) {
    const displayList = list.slice(0, 2)
    const moreCount = list.length - displayList.length
    return (
      <ul className="text-left">
        {displayList.map((workItem, index) => (
          <li key={index}>
            <p key={index} className="flex flex-row gap-2 items-center">
              <IconCircleFilled className="text-red-500 w-4 h-4" />
              <time className="font-medium text-gray-950">
                {getTimeDate(workItem.startedOn!)}
              </time>
              - {workItem.name}
            </p>
          </li>
        ))}
        {moreCount > 0 && moreItems(list, moreCount)}
      </ul>
    )
  }

  return null
}

export const WorkItemsCalendarPage = () => {
  const { workItems } = useWorkItemApiQuery({})

  return (
    <>
      <WorkItemNav />
      <div className="relative">
        <Calendar bordered renderCell={(date) => renderCell(date, workItems)} />
      </div>
    </>
  )
}
