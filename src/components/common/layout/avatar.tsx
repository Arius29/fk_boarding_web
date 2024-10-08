import { getAvatarRandom } from '../../../utils/avatar-util'

interface AvatarProps extends React.HTMLAttributes<HTMLImageElement> {
  name: string
  size?: Sizes
}

type Sizes =
  | 'xs'
  | '2xs'
  | 'sm-xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
const CLASS_NAMES_SIZES = {
  xs: 'w-6 h-6 rounded-full object-center',
  '2xs': 'w-7 h-7 rounded-full object-center',
  'sm-xs': 'w-8 h-8 rounded-full object-center',
  sm: 'w-9 h-9 rounded-full object-center',
  md: 'w-14 h-14 rounded-full object-center',
  lg: 'w-20 h-20 rounded-full object-center',
  xl: 'w-28 h-28 rounded-full object-center',
  '2xl': 'w-32 h-32 rounded-full object-center',
  '3xl': 'w-36 h-36 rounded-full object-center',
  '4xl': 'w-40 h-40 rounded-full object-center',
  '5xl': 'w-44 h-44 rounded-full object-center',
}
const getClassName = (size: Sizes) => {
  return CLASS_NAMES_SIZES[size]
}

export const Avatar = ({ name, size = 'md', style, ...props }: AvatarProps) => {
  return (
    <img
      src={getAvatarRandom(name)}
      style={{ ...style }}
      className={getClassName(size)}
      {...props}
    />
  )
}
