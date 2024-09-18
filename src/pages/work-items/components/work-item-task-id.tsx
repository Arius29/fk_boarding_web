import { IconSquareCheckFilled } from '@tabler/icons-react'

interface WorkItemTaskIdProps extends React.HTMLAttributes<HTMLSpanElement> {
  workItemId: number
}
export const WorkItemTaskId = ({ workItemId }: WorkItemTaskIdProps) => {
  return (
    <span className="flex flex-row items-center gap-1 text-sm text-gray-500">
      <IconSquareCheckFilled className="text-blue-550" />
      {`TR-${workItemId}`}
    </span>
  )
}
