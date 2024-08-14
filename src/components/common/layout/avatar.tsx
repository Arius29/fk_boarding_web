import { getAvatarColor, getInitials } from '../../../utils/user-utils'
interface AvatarProps {
  name: string
}
export const Avatar = ({ name }: AvatarProps) => {
  const initials = getInitials(name)
  const backgroundColor = getAvatarColor(name)
  return (
    <span
      style={{ backgroundColor }}
      className="w-14 h-14 flex items-center justify-center rounded-full text-white text-lg font-semibold"
    >
      {initials}
    </span>
  )
}
