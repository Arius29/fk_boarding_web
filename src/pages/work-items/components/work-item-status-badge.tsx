import {
  getWorkItemStatus,
  WorkItemStatus,
} from '../interfaces/work-item-status'

const CLASSS_NAMES = {
  0: 'text-not-started bg-not-started',
  1: 'text-in-progress bg-in-progress',
  2: 'text-completed bg-completed',
  3: 'text-abandoned bg-abandoned',
}

interface WorkItemStatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  status: WorkItemStatus
}

export const WorkItemStatusBadge = ({
  status,
  ...props
}: WorkItemStatusBadgeProps) => {
  return (
    <span
      {...props}
      className={`rounded-full w-fit text-sm text-nowrap bg-opacity-30 px-3 ${CLASSS_NAMES[status]}`}
    >
      {getWorkItemStatus(status)}
    </span>
  )
}
