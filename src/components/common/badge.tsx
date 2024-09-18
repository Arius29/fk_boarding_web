import { IconCircleFilled } from '@tabler/icons-react'
import { hexToRgba } from '../../utils/color-converter'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string
  opacity?: number
  children: React.ReactNode
  type?: 'x-small' | 'small' | 'medium' | 'large'
}

const getBadgeSize = (type?: 'x-small' | 'small' | 'medium' | 'large') => {
  switch (type) {
    case 'x-small':
      return 'text-xs px-1.5 w-fit'
    case 'small':
      return 'text-sm px-2 w-fit'
    case 'medium':
      return 'text-sm px-2 py-1'
    case 'large':
      return 'text-lg px-3 py-1.5'
  }
}

export const Badge = ({
  children,
  color = '#000000',
  opacity = 0.3,
  type = 'medium',
  ...props
}: BadgeProps) => {
  const backgroundColor = hexToRgba(color, opacity)
  const badgeSize = getBadgeSize(type)
  return (
    <span
      style={{ backgroundColor, color, ...props.style }}
      className={`${badgeSize} rounded-full flex flex-row text-nowrap flex-nowrap gap-2 items-center`}
      {...props}
    >
      <IconCircleFilled width={18} height={18} fill={color} />
      {children}
    </span>
  )
}
