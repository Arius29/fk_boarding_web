import { Toaster } from 'sonner'
import { Title } from '../../components/common/core/title'

export const NotificationsPage = () => {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Title>Process</Title>
      <ul className="w-full space-y-3">
        <li className="relative grid w-full grid-cols-12 items-center border-l-2 border-blue-600 bg-blue-50 p-4">
          <i className="ti ti-template row-span-2 inline-block h-8 w-8 self-center justify-self-center rounded-full bg-blue-300 p-2 text-blue-600"></i>
          <p className="col-span-11 font-medium">Title</p>
          <p className="col-span-11 w-full truncate">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic,
            libero id! Beatae veniam sed facilis libero accusamus eius corrupti
            expedita? Eos facere unde velit? Quidem necessitatibus vero ducimus
            dolorem! Beatae!
          </p>
          <span className="absolute right-5 top-2">
            <time className="text-sm text-gray-600">1m ago</time>
          </span>
        </li>
        <li className="relative grid w-full grid-cols-12 items-center border-l-2 border-blue-600 p-4">
          <i className="ti ti-template row-span-2 inline-block h-8 w-8 self-center justify-self-center rounded-full bg-blue-300 p-2 text-blue-600"></i>
          <p className="col-span-11 font-medium">Title</p>
          <p className="col-span-11 w-full truncate">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic,
            libero id! Beatae veniam sed facilis libero accusamus eius corrupti
            expedita? Eos facere unde velit? Quidem necessitatibus vero ducimus
            dolorem! Beatae!
          </p>
          <span className="absolute right-5 top-2">
            <time className="text-sm text-gray-600">1m ago</time>
          </span>
        </li>
      </ul>
    </>
  )
}
