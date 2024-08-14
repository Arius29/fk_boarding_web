import { useMsal } from '@azure/msal-react'
import { Avatar } from './avatar'

export const UserSummary = () => {
  const { accounts } = useMsal()
  const account = accounts[0]
  return (
    <div className="grid grid-cols-3 items-center p-3 border-t border-gray-300">
      <p className="col-span-1 row-span-2">
        <Avatar name={account?.name || ''} />
      </p>
      <address className="not-italic col-span-2">
        <p className="text-lg font-semibold">{account?.name}</p>
        <p className="text-sm text-gray-500 truncate">{account?.username}</p>
      </address>
    </div>
  )
}
