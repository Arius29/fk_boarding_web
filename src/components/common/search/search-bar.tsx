import { IconSearch } from '@tabler/icons-react'
import { forwardRef } from 'react'

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ ...props }, ref) => {
    return (
      <fieldset className="flex flex-row flex-nowrap gap-3 items-center py-2 px-4 border border-gray-400 rounded-full group transition-colors delay-0 duration-150 ease-linear hover:border-gray-950 active:border-gray-950 focus:border-gray-950 max-w-96">
        <IconSearch
          stroke={2}
          className="text-gray-400 group-hover:text-gray-950 group-active:text-gray-950 group-focus:text-gray-950"
        />
        <input
          type="search"
          ref={ref}
          {...props}
          placeholder="Search"
          className=" ring-0 outline-none w-full placeholder-gray-400 group-hover:placeholder-gray-950 group-active:placeholder-gray-950 group-focus:placeholder-gray-950"
          autoComplete="off"
        />
      </fieldset>
    )
  }
)
