import { IconCircleFilled } from '@tabler/icons-react'
import { hexToRgba } from '../../../utils/color-converter'

interface ColorBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string
  opacity?: number
}

export const ColorBadge = ({
  color = '#000000',
  opacity = 0.3,
  ...props
}: ColorBadgeProps) => {
  const backgroundColor = hexToRgba(color, opacity)

  return (
    <span
      className="p-1 rounded-full border inline-block mt-2"
      {...props}
      style={{ backgroundColor, borderColor: color }}
    >
      <IconCircleFilled width={15} height={15} fill={color} />
    </span>
  )
}
