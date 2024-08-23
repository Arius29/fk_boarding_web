import { Avatar } from '../../../components/common/layout/avatar'
import { User } from '../interfaces/user'

interface UserBadgeProps {
  user: User
  isActive?: boolean
}

export const UserBadge = ({ user, isActive = false }: UserBadgeProps) => {
  return (
    <article
      tabIndex={0}
      className={
        isActive
          ? 'p-2 flex flex-row flex-nowrap gap-4 font-medium rounded-full bg-gray-200 items-center cursor-pointer ring-0 outline-none'
          : 'p-2 flex flex-row flex-nowrap gap-4 font-medium rounded-full bg-gray-50 items-center cursor-pointer ring-0 outline-none hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200'
      }
    >
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full object-center"
        />
      ) : (
        <Avatar name={user.name} size="sm" />
      )}

      <h3 className="truncate font-medium">{user.name}</h3>
    </article>
  )
}
