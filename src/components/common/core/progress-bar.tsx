interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  progress: number
}
export const ProgressBar = ({ progress = 0, ...props }: ProgressBarProps) => {
  return (
    <div className="w-full rounded-full bg-gray-200" {...props}>
      <div
        className="rounded-full bg-blue-550 p-0.5 text-center text-xs font-medium leading-none text-blue-100"
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
    </div>
  )
}
