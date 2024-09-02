import { IconTemplate } from '@tabler/icons-react'
import { timeAgo } from '../../../utils/date-utils'

interface NotificationItemProps extends React.HTMLAttributes<HTMLLIElement> {
  title: string
  message: string
  time: string | Date
  isRead?: boolean
}

const GET_CLASS_NAME = (isRead: boolean) => {
  return isRead
    ? 'relative grid w-full grid-cols-12 items-center border-l-2 border-blue-600 p-4'
    : 'relative grid w-full grid-cols-12 items-center border-l-2 border-blue-550 p-4 bg-blue-550 bg-opacity-10'
}

export const NotificationItem = ({
  title,
  message,
  time,
  isRead = false,
  ...props
}: NotificationItemProps) => {
  return (
    <li className={GET_CLASS_NAME(isRead)} {...props}>
      <IconTemplate
        stroke={2}
        className="row-span-2 inline-block h-8 w-8 self-center justify-self-center rounded-full bg-blue-300 p-2 text-blue-600"
      />
      <p className="col-span-11 font-medium">{title}</p>
      <p className="col-span-11 w-full truncate">{message}</p>
      <span className="absolute right-5 top-2">
        <time className="text-sm text-gray-600">{timeAgo(time)}</time>
      </span>
    </li>
  )
}
