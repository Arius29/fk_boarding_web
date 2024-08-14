interface MicrosoftIconProps extends React.SVGProps<SVGSVGElement> {
  width: number
  height: number
}

export const MicrosoftIconProps = ({
  width,
  height,
  ...props
}: MicrosoftIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Microsoft"
      viewBox="0 0 512 512"
      width={width}
      height={height}
      {...props}
    >
      <rect fill="#fff" rx="15%" />
      <path fill="#f25022" d="M75 75v171h171V75z" />
      <path fill="#7fba00" d="M266 75v171h171V75z" />
      <path fill="#00a4ef" d="M75 266v171h171V266z" />
      <path fill="#ffb900" d="M266 266v171h171V266z" />
    </svg>
  )
}
