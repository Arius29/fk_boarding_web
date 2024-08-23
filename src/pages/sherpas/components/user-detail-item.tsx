interface UserDetailItemProps<T> {
  label: string
  value?: T
  icon?: React.ReactNode
}

export const UserDetailItem = <T extends string | number>({
  label,
  value,
  icon,
}: UserDetailItemProps<T>) => {
  return (
    <>
      <strong className="text-sm text-gray-500">{label}</strong>
      <p className="flex flex-row items-center gap-3 font-medium">
        {icon && <span aria-hidden="true">{icon}</span>}
        {value}
      </p>
    </>
  )
}
