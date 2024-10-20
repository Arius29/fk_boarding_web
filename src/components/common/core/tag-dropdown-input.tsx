import {
  IconSquareCheck,
  IconSquareCheckFilled,
  IconTag,
} from '@tabler/icons-react'
import { useTagsApiQuery } from '../../../hooks/use-tag-api-query'
import { useState } from 'react'
import { Tag } from '../../../pages/tags/interfaces/tag'
import { WorkItemTag } from '../../../pages/tags/interfaces/wok-item-tag'

interface TagDropdownProps {
  addTag: (tag: Tag) => void
  selectedTags?: WorkItemTag[]
  containerStyles?: React.CSSProperties
  error?: string
  disabled?: boolean
}

// const CLASS_NAMES = {
//   base: 'ring-0 outline-none border-b p-2 inline-block w-full',
//   disable:
//     'ring-0 outline-none border-b border-gray-300 p-2 inline-block w-full text-gray-300',
// }

export const TagDropdownInput = ({
  addTag,
  selectedTags = [],
  containerStyles,
  disabled,
  error,
}: TagDropdownProps) => {
  const [showModal, setShowModal] = useState(false)
  const { tags } = useTagsApiQuery(true)

  const toggleModal = () => {
    setShowModal((prev) => !prev)
  }

  return (
    <>
      <div className="flex flex-col relative" style={{ ...containerStyles }}>
        <button
          type="button"
          className="py-2 px-4 rounded bg-blue-550 bg-opacity-30 text-sm flex flex-row flex-nowrap gap-3 items-center w-28 transition-colors duration-200 ease-in-out delay-0 hover:bg-opacity-80 active:bg-opacity-80 focus:bg-opacity-80"
          onClick={() => {
            if (!disabled) toggleModal()
          }}
        >
          <IconTag stroke={2} />
          Tags
        </button>
        {showModal && (
          <div
            id="dropDownTags"
            className="absolute z-50 bg-white rounded-lg shadow w-full top-full"
          >
            <ul
              className="max-h-40 overflow-y-auto text-gray-700"
              aria-labelledby="dropDownTags"
            >
              {tags.map((tag) => (
                <li
                  key={tag.id}
                  onClick={() => {
                    addTag(tag)
                    toggleModal()
                  }}
                >
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 hover:bg-gray-100 gap-2 last:rounded-lg"
                  >
                    {selectedTags.find((t) => t.tagId === tag.id) ? (
                      <IconSquareCheckFilled
                        stroke={2}
                        className="text-blue-550"
                      />
                    ) : (
                      <IconSquareCheck stroke={2} />
                    )}
                    {tag.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm w-full">{error}</p>}
    </>
  )
}
