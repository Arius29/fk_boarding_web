import { IconCalendarDue, IconDots } from '@tabler/icons-react'
import { WorkItemPriorityBadge } from './work-item-priority-badge'
import { WorkItemStatusBadge } from './work-item-status-badge'
import { Avatar } from '../../../components/common/layout/avatar'
import { WorkItemsTagsList } from './work-items-tags-list'
import { WorkItemTaskId } from './work-item-task-id'
import { WorkItem } from '../interfaces/work-item'

interface WorkItemListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  workItem: WorkItem
  handleEditTask: (workItem: WorkItem) => void
}
export const WorkItemListItem = ({
  workItem,
  handleEditTask,
  ...props
}: WorkItemListItemProps) => {
  return (
    <li
      key={workItem.id}
      onClick={() => handleEditTask(workItem)}
      className="relative p-4 border bg-white border-gray-200 rounded-md w-96 h-48 grid items-center gap-3 hover:bg-gray-50 active:bg-gray-50 focus:bg-gray-50"
      {...props}
    >
      <header className="grid grid-cols-3 items-center">
        <WorkItemPriorityBadge priority={workItem.priority || 0} />
        <WorkItemStatusBadge status={workItem.status} />
        <button className="justify-self-end transition-transform ease-linear duration-150 delay-0 hover:scale-110 active:scale-110 focus:scale-110">
          <IconDots stroke={3} width={24} height={24} />
        </button>
      </header>
      <div className="grid grid-cols-10 grid-rows-2 items-center">
        <p className="col-span-6 row-span-2 line-clamp-2 max-h-12 font-medium">
          {workItem.name}
        </p>
        <ul className="col-span-4 flex row-span-2 h-full flex-row items-start justify-end w-full">
          {workItem.recipients?.slice(0, 4).map((workItemRecipient, index) => (
            <li
              key={index}
              className="[&:nth-child(2)]:-translate-x-3 [&:nth-child(3)]:-translate-x-7 [&:nth-child(4)]:-translate-x-10 [&:nth-child(5)]:-translate-x-10"
            >
              <Avatar
                name={workItemRecipient.user?.name || 'Sherpa User'}
                size="2xs"
              />
            </li>
          ))}
          {workItem.recipients?.length && workItem.recipients?.length > 4 ? (
            <li className="last:grid last:h-7 last:w-7 last:place-items-center last:rounded-full last:border last:border-gray-300 last:bg-white last:text-sm [&:nth-child(2)]:-translate-x-3 [&:nth-child(3)]:-translate-x-7 [&:nth-child(4)]:-translate-x-10 [&:nth-child(5)]:-translate-x-10">
              {`+${workItem.recipients.length - 4}`}
            </li>
          ) : null}
        </ul>
      </div>
      <WorkItemsTagsList workItemTags={workItem.tags || []} />
      <footer className="flex flex-row flex-nowrap justify-between items-center">
        <WorkItemTaskId workItemId={workItem.id} />
        <span className="text-sm flex flex-row items-center gap-1">
          <IconCalendarDue stroke={2} />
          <time>{workItem.dueDate || 'N/D'}</time>
        </span>
        <Avatar name={workItem.assigner?.name || 'Sherpa User'} size="2xs" />
      </footer>
    </li>
  )
}
