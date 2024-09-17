interface DropDownStatusItemProps extends React.HTMLAttributes<HTMLLIElement> {
  status?: 'NotStarted' | 'InProgress' | 'Completed' | 'Abandoned'
  type?: 'filled' | 'filled-active' | 'not-filled' | 'not-filled-active'
  children: React.ReactNode
}

const getClassName = (
  status: 'NotStarted' | 'InProgress' | 'Completed' | 'Abandoned',
  type: 'filled' | 'filled-active' | 'not-filled' | 'not-filled-active'
) => {
  const colorClass = {
    NotStarted:
      'text-not-started hover:bg-not-started active:bg-not-started focus:bg-not-started',
    InProgress:
      'text-in-progress hover:bg-in-progress active:bg-in-progress focus:bg-in-progress',
    Completed:
      'text-completed hover:bg-completed active:bg-completed focus:bg-completed',
    Abandoned:
      'text-abandoned hover:bg-abandoned active:bg-abandoned focus:bg-abandoned',
    'NotStarted-active': 'border-not-started',
    'InProgress-active': 'border-in-progress',
    'Completed-active': 'border-completed',
    'Abandoned-active': 'border-abandoned',
    'NotStarted-bg': 'bg-not-started text-white',
    'InProgress-bg': 'bg-in-progress text-white',
    'Completed-bg': 'bg-completed text-white',
    'Abandoned-bg': 'bg-abandoned text-white',
  }

  const CLASS_NAMES = {
    'not-filled': `w-full py-2 px-4 delay-0 border-l-2 border-transparent transition-colors duration-150 ease-in-out ${colorClass[status]} hover:bg-opacity-20 active:bg-opacity-20 focus:bg-opacity-20`,
    'not-filled-active': `w-full py-2 px-4 delay-0 border-l-2 transition-colors duration-150 ease-in-out ${colorClass[status]} ${colorClass[`${status}-active`]} hover:bg-opacity-20 active:bg-opacity-20 focus:bg-opacity-20`,
    filled: `w-full py-2 px-4 delay-0 border-l-2 border-transparent transition-colors duration-150 ease-in-out ${colorClass[`${status}-bg`]}`,
    'filled-active': `w-full py-2 px-4 delay-0 border-l-2 border-transparent transition-colors duration-150 ease-in-out ${colorClass[`${status}-bg`]}`,
  }

  return CLASS_NAMES[type]
}

export const DropDownStatusItem = ({
  status = 'NotStarted',
  type = 'not-filled',
  children,
  ...props
}: DropDownStatusItemProps) => {
  const className = getClassName(status, type)
  return (
    <li {...props} className={className}>
      <a href="#">{children}</a>
    </li>
  )
}
