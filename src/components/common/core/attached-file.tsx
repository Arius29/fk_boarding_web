import { IconFile, IconXboxX } from '@tabler/icons-react'
import { ProgressBar } from './progress-bar'
interface AttachedFileProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  progress: number
  fileName: string
  fileStatus: string
}
export const AttachedFile = ({
  progress,
  fileName,
  fileStatus,
  ...props
}: AttachedFileProps) => {
  return (
    <div className="mb-4 grid w-full gap-1">
      <div className="flex items-center justify-between gap-2">
        <header className="flex items-center gap-2">
          <IconFile stroke={2} className="w-6 h-6 text-blue-550" />
          <div className="grid gap-1">
            <h4 className="text-sm font-normal leading-snug text-gray-900 truncate">
              {fileName}
            </h4>
            <h5 className="text-xs font-normal leading-[18px] text-gray-400">
              {fileStatus}
            </h5>
          </div>
        </header>
        <button type="button" {...props} className="ring-0 outline-none ">
          <IconXboxX
            stroke={2}
            className="w-6 h-6 text-gray-400 transition-colors delay-0 duration-150 ease-linear hover:text-red-500 focus:text-red-500 active:text-red-500"
          />
        </button>
      </div>
      <ProgressBar progress={progress} />
    </div>
  )
}
