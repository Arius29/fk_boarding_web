import { IconUpload } from '@tabler/icons-react'
interface UploadFileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  handleUploadUserFile: (file: File) => void
  label?: string
}
export const UploadFileInput = ({
  label = 'Upload file',
  handleUploadUserFile,
  ...props
}: UploadFileInputProps) => {
  return (
    <label
      htmlFor="file"
      tabIndex={10}
      className="flex w-fit cursor-pointer flex-row items-center gap-3 rounded-full bg-blue-550 px-4 py-2 ring-0 outline-none text-white transition-colors delay-0 duration-150 ease-linear hover:bg-blue-650 focus:bg-blue-650 active:bg-blue-650"
    >
      <IconUpload stroke={2} className="w-6 h-6" />
      <span>{label}</span>
      <input
        id="file"
        type="file"
        className="hidden"
        {...props}
        onChange={(e) => handleUploadUserFile(e.target.files![0])}
      />
    </label>
  )
}
