import { IconFile, IconXboxX } from '@tabler/icons-react'
import { ProgressBar } from './progress-bar'
import { UserFile } from '../../../pages/sherpas/interfaces/user-file'
import { useState } from 'react'
interface AttachedFileProps {
  progressValue?: number
  userFile: UserFile
  fileStatus: string
  handleDeleteFile: (userFileId: string) => void
}
export const AttachedFile = ({
  progressValue = 0,
  userFile,
  fileStatus,
  handleDeleteFile,
}: AttachedFileProps) => {
  const [progress] = useState<number>(progressValue)
  const { fileName, contentType, fileData } = userFile

  const base64Data = fileData.replace(/\s+/g, '')
  const byteCharacters = atob(base64Data)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], { type: contentType })
  const fileUrl = URL.createObjectURL(blob)

  return (
    <div className="mb-4 grid w-full gap-1">
      <div className="flex items-center justify-between gap-2">
        <header className="flex items-center gap-2">
          <IconFile stroke={2} className="w-6 h-6 text-blue-550" />
          <div className="grid gap-1">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-normal leading-snug text-gray-900 truncate"
            >
              {fileName}
            </a>
            <h5 className="text-xs font-normal leading-[18px] text-gray-400">
              {fileStatus}
            </h5>
          </div>
        </header>
        <button
          type="button"
          className="ring-0 outline-none"
          onClick={() => handleDeleteFile(fileName)}
        >
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
