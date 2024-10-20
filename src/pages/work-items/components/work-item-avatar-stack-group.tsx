import { Avatar } from '../../../components/common/layout/avatar'
import { WorkItemRecipient } from '../interfaces/work-item-recipient'
import { WorkItemReporter } from '../interfaces/work-item-reporter'

interface WorkItemAvatarStackGroupProps
  extends React.HTMLAttributes<HTMLUListElement> {
  users: WorkItemRecipient[] | WorkItemReporter[]
  className?: string
}

export const WorkItemAvatarStackGroup = ({
  users = [],
  className = '',
}: WorkItemAvatarStackGroupProps) => {
  return (
    <ul
      className={
        className ||
        'flex row-span-2 h-full flex-row items-start justify-end w-full'
      }
    >
      {users?.slice(0, 4).map((user, index) => (
        <li
          key={index}
          className="[&:nth-child(2)]:-translate-x-3 [&:nth-child(3)]:-translate-x-7 [&:nth-child(4)]:-translate-x-10 [&:nth-child(5)]:-translate-x-10"
        >
          <Avatar name={user.user?.name || 'Sherpa User'} size="2xs" />
        </li>
      ))}
      {users?.length && users?.length > 4 ? (
        <li className="last:grid last:h-7 last:w-7 last:place-items-center last:rounded-full last:border last:border-gray-300 last:bg-white last:text-sm [&:nth-child(2)]:-translate-x-3 [&:nth-child(3)]:-translate-x-7 [&:nth-child(4)]:-translate-x-10 [&:nth-child(5)]:-translate-x-10">
          {`+${users.length - 4}`}
        </li>
      ) : null}
    </ul>
  )
}
