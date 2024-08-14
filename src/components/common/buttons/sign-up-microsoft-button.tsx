import { MicrosoftIconProps } from '../../../assets/svgs/microsoft-icon'

interface SignUpMicrosoftButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SignUpMicrosoftButton = ({
  ...props
}: SignUpMicrosoftButtonProps) => {
  return (
    <button
      {...props}
      type="button"
      className="rounded-md bg-transparent w-full max-w-xl border border-gray-200 text-gray-500 hover:border-gray-950 hover:text-gray-950 active:text-gray-950 focus:text-gray-950 active:border-gray-950 focus:border-gray-950 bg-white p-2 ring-0 outline-none flex flex-row gap-4"
    >
      <MicrosoftIconProps width={24} height={24} /> Sign up with Microsoft
    </button>
  )
}
