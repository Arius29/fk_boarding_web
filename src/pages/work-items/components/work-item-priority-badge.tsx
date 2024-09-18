import { IconCircleFilled } from '@tabler/icons-react'
import { WorkItemPriority } from '../interfaces/work-item-priority'

interface WorkItemPriorityBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  priority: WorkItemPriority
}

const getWorkItemPriority = (priority: WorkItemPriority) => {
  switch (priority) {
    case WorkItemPriority.High:
      return 'High'
    case WorkItemPriority.Low:
      return 'Low'
    case WorkItemPriority.Medium:
      return 'Medium'
  }
}

const getPriorityColor = (priority: WorkItemPriority) => {
  switch (priority) {
    case WorkItemPriority.High:
      return 'text-red-500'
    case WorkItemPriority.Medium:
      return 'text-orange-500'
    case WorkItemPriority.Low:
      return 'text-green-500'
  }
}

export const WorkItemPriorityBadge = ({
  priority,
  ...props
}: WorkItemPriorityBadgeProps) => {
  const priorityLabel = getWorkItemPriority(priority)
  const color = getPriorityColor(priority)
  return (
    <span
      {...props}
      className={`${color} flex flex-row gap-1 text-nowrap rounded-full w-fit text-sm px-3"`}
    >
      <IconCircleFilled width={18} height={18} />
      {priorityLabel}
    </span>
  )
}
