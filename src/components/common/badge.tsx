import { IconCircleFilled } from '@tabler/icons-react'
import { hexToRgba } from '../../utils/color-converter'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string
  opacity?: number
  children: React.ReactNode
}
export const Badge = ({
  children,
  color = '#000000',
  opacity = 0.3,
  ...props
}: BadgeProps) => {
  const backgroundColor = hexToRgba(color, opacity)

  return (
    <span
      style={{ backgroundColor, color }}
      className="text-sm rounded-full px-2 py-1 flex flex-row flex-nowrap gap-2 items-center"
      {...props}
    >
      <IconCircleFilled width={18} height={18} fill={color} />
      {children}
    </span>
  )
}
