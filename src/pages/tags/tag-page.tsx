import { useRef, useState } from 'react'
import { EditTagModal } from './components/edit-tag-modal'
import { TableTags } from './components/table-tags'
import { Tag } from './interfaces/Tag'
import { sortArray } from '../../utils/array-utils'
import { useTablePagination } from '../../hooks/use-table-pagination'
import { TablePagination } from '../../components/common/table/table-pagination'

const initialState: Tag[] = [
  {
    id: 1,
    name: 'TI',
    description: 'Soporte telematico',
    hexColor: '#db182c',
  },
  {
    id: 3,
    name: 'SA',
    description: 'Soporte administrativo',
    hexColor: '#4287f5',
  },
  {
    id: 2,
    name: 'RH',
    description: 'Recursos humanos',
    hexColor: '#4287f5',
  },
  {
    id: 4,
    name: 'RH',
    description: 'Recursos humanos',
    hexColor: '#4287f5',
  },
  {
    id: 5,
    name: 'RH',
    description: 'Recursos humanos',
    hexColor: '#4287f5',
  },
  {
    id: 6,
    name: 'RH',
    description: 'Recursos humanos',
    hexColor: '#4287f5',
  },
  {
    id: 7,
    name: 'RH',
    description: 'Recursos humanos',
    hexColor: '#4287f5',
  },
  {
    id: 8,
    name: 'RH',
    description: 'Recursos humanos',
    hexColor: '#4287f5',
  },
  {
    id: 9,
    name: 'RH',
    description: 'Recursos humanos',
    hexColor: '#4287f5',
  },
  {
    id: 10,
    name: 'RH',
    description: 'Recursos humanos',
    hexColor: '#4287f5',
  },
  {
    id: 11,
    name: 'RH',
    description: 'Recursos humanos',
    hexColor: '#4287f5',
  },
  {
    id: 12,
    name: 'RH',
    description: 'Recursos humanos',
    hexColor: '#4287f5',
  },
  {
    id: 13,
    name: 'RH',
    description: 'Recursos humanos',
    hexColor: '#4287f5',
  },
  {
    id: 14,
    name: 'RH',
    description: 'Recursos humanos',
    hexColor: '#4287f5',
  },
  {
    id: 15,
    name: 'RH',
    description: 'Recursos humanos',
    hexColor: '#4287f5',
  },
  {
    id: 16,
    name: 'RH',
    description: 'Recursos humanos',
    hexColor: '#4287f5',
  },
]

type SortOrder = 'asc' | 'desc'

export const TagPage = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedTag, setSelectedTag] = useState<Tag | undefined>()
  const sortConfig = useRef<SortOrder>('asc')
  const handleToggle = () => setShowModal(!showModal)
  const [tags, setTags] = useState<Tag[]>(initialState)

  const handleSelectTag = (id: number) => {
    const tag = tags.find((tag) => tag.id === id)
    if (!tag) return
    setSelectedTag(tag)
    handleToggle()
  }
  const handleSortColumn = (key: keyof Tag) => {
    sortConfig.current = sortConfig.current == 'asc' ? 'desc' : 'asc'
    const sortedTags = sortArray(tags, key, sortConfig.current)
    setTags(sortedTags)
  }

  const { current, totalPages, handleChangePage, paginatedItems } =
    useTablePagination({
      items: tags,
      itemsPerPage: 15,
      currentPage: 1,
    })

  return (
    <>
      <h1 className="text-2xl">Tags</h1>
      <header>
        <form action="">
          <input type="search" placeholder="Search" />
        </form>
        <button aria-label="Add new tag">Add</button>
      </header>
      <div className="sm:rounded-lg flex-1  flex flex-col justify-between items-center">
        <TableTags
          tags={paginatedItems}
          handleSelectTag={handleSelectTag}
          handleSortColumn={handleSortColumn}
        />
        <TablePagination
          currentPage={current}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
      </div>
      {showModal && selectedTag && (
        <EditTagModal handleToggle={handleToggle} tag={selectedTag} />
      )}
    </>
  )
}
