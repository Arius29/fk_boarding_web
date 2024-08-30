type Type = 'base' | 'active'
interface DropDownMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  type?: Type
  children: React.ReactNode
}

const CLASS_NAMES = {
  base: 'w-full py-2 px-4 border-l-2 border-transparent transition-colors delay-0 duration-150 ease-in-out hover:bg-blue-550 active:bg-blue-550 focus:bg-blue-550 hover:bg-opacity-30 active:bg-opacity-30 focus:bg-opacity-30',
  active:
    'w-full py-2 px-4 border-l-2 border-blue-550 hover:bg-blue-550 active:bg-blue-550 focus:bg-blue-550 hover:bg-opacity-30 active:bg-opacity-30 focus:bg-opacity-30',
}

export const DropDownMenuItem = ({
  type = 'base',
  children,
  ...props
}: DropDownMenuItemProps) => {
  const className = CLASS_NAMES[type]

  return (
    <li {...props} className={className}>
      <a href="#">{children}</a>
    </li>
  )
}
