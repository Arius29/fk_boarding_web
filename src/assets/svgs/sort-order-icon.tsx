interface SortOrderIconProps extends React.SVGProps<SVGSVGElement> {
  fill?: string
  width: number
  height: number
}

export const SortOrderIcon = ({
  fill,
  width,
  height,
  ...props
}: SortOrderIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      {...props}
    >
      <path
        fill={fill ?? '#2B2B2B'}
        d="M6.667 11.583h6.666L10 15.542l-3.333-3.959ZM13.333 8.417H6.667L10 4.458l3.333 3.959Z"
      />
    </svg>
  )
}
