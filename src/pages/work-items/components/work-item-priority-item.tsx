interface WorkItemPriorityItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  status?: 'Low' | 'Medium' | 'High'
  type?: 'filled' | 'filled-active' | 'not-filled' | 'not-filled-active'
  children: React.ReactNode
}

const getClassName = (
  status: 'Low' | 'Medium' | 'High',
  type: 'filled' | 'filled-active' | 'not-filled' | 'not-filled-active'
) => {
  const colorClass = {
    Low: 'text-green-400 hover:bg-green-400 active:bg-green-400 focus:bg-green-400',
    Medium:
      'text-orange-400 hover:bg-orange-400 active:bg-orange-400 focus:bg-orange-400',
    High: 'text-red-400 hover:bg-red-400 active:bg-red-400 focus:bg-red-400',
    'Low-active': 'border-green-400',
    'Medium-active': 'border-orange-400',
    'High-active': 'border-red-400',
    'Low-bg': 'bg-green-400 text-white',
    'Medium-bg': 'bg-orange-400 text-white',
    'High-bg': 'bg-red-400 text-white',
  }

  const CLASS_NAMES = {
    'not-filled': `w-full py-2 px-4 delay-0 border-l-2 border-transparent transition-colors duration-150 ease-in-out ${colorClass[status]} hover:bg-opacity-20 active:bg-opacity-20 focus:bg-opacity-20`,
    'not-filled-active': `w-full py-2 px-4 delay-0 border-l-2 transition-colors duration-150 ease-in-out ${colorClass[status]} ${colorClass[`${status}-active`]} hover:bg-opacity-20 active:bg-opacity-20 focus:bg-opacity-20`,
    filled: `w-full py-2 px-4 delay-0 border-l-2 border-transparent transition-colors duration-150 ease-in-out ${colorClass[`${status}-bg`]}`,
    'filled-active': `w-full py-2 px-4 delay-0 border-l-2 border-transparent transition-colors duration-150 ease-in-out ${colorClass[`${status}-bg`]}`,
  }

  return CLASS_NAMES[type]
}

export const WorkItemPriorityItem = ({
  status = 'Low',
  type = 'not-filled',
  children,
  ...props
}: WorkItemPriorityItemProps) => {
  const className = getClassName(status, type)

  return (
    <li {...props} className={className}>
      <a href="#">{children}</a>
    </li>
  )
}
