import { useRef, useState } from 'react'
import { EditTagModal } from './components/edit-tag-modal'
import { TableTags } from './components/table-tags'
import { Tag } from './interfaces/tag'
import { sortArray } from '../../utils/array-utils'
import { useTablePagination } from '../../hooks/use-table-pagination'
import { TablePagination } from '../../components/common/table/table-pagination'
import { SearchBar } from '../../components/common/search/search-bar'
import { PrimaryButton } from '../../components/common/buttons/primary-button'
import { Title } from '../../components/common/core/title'
import { useTagsApiQuery } from '../../hooks/use-tag-api-query'
import { Toaster } from 'sonner'

const initialStateTag: Tag = {
  id: 0,
  name: '',
  description: '',
  hexColor: '#000000',
}

type SortOrder = 'asc' | 'desc'

const filterTags = (tags: Tag[], searchValue: string) => {
  return tags.filter((tag) => {
    return (
      tag.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      tag.description?.toLowerCase().includes(searchValue.toLowerCase())
    )
  })
}

export const TagPage = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [showModal, setShowModal] = useState(false)
  const [selectedTag, setSelectedTag] = useState<Tag>(initialStateTag)
  const sortConfig = useRef<SortOrder>('asc')
  const isEditing = useRef<boolean>(false)
  const searchBarRef = useRef<HTMLInputElement>(null)
  const {
    tags,
    setTags,
    mutationAddTag,
    mutationDeleteProcess,
    mutationEditProcess,
  } = useTagsApiQuery()

  const handleToggle = () => setShowModal(!showModal)
  const handleSelectTag = (id: number) => {
    const tag = tags.find((tag) => tag.id === id)
    if (!tag) return
    setSelectedTag(tag)
    isEditing.current = true
    handleToggle()
  }
  const handleSortColumn = (key: keyof Tag) => {
    sortConfig.current = sortConfig.current == 'asc' ? 'desc' : 'asc'
    const sortedTags = sortArray(tags, key, sortConfig.current)
    setTags(sortedTags)
  }

  const handleTagForm = (tag: Tag) => {
    if (isEditing.current) mutationEditProcess.mutate(tag)
    else mutationAddTag.mutate(tag)
    handleToggle()
  }

  const handleDeleteTag = (id: number) => {
    mutationDeleteProcess.mutate(id)
  }

  const handleSearch = (query: string) => {
    setSearchValue(query)
  }

  const { current, totalPages, handleChangePage, paginatedItems } =
    useTablePagination({
      items: filterTags(tags, searchValue),
      itemsPerPage: 10,
      currentPage: 1,
    })

  return (
    <>
      <Toaster position="top-right" richColors />
      <Title>Tags</Title>
      <header className="flex flex-row flex-nowrap justify-between items-center mb-8">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSearch(searchBarRef.current?.value || '')
          }}
        >
          <SearchBar
            onBlur={(e) => handleSearch(e.target.value)}
            ref={searchBarRef}
          />
        </form>
        <PrimaryButton
          onClick={() => {
            isEditing.current = false
            handleToggle()
          }}
        >
          Add
        </PrimaryButton>
      </header>
      <section
        className="sm:rounded-lg flex-1 flex flex-col justify-between items-center"
        style={{ maxHeight: 'calc(100vh - 208px)' }}
      >
        <div className="flex-1 w-full overflow-y-auto">
          <TableTags
            tags={paginatedItems}
            handleSelectTag={handleSelectTag}
            handleSortColumn={handleSortColumn}
            handleDeleteTag={handleDeleteTag}
          />
        </div>
        <TablePagination
          currentPage={current}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
      </section>
      {showModal && (
        <EditTagModal
          isEditing={isEditing.current}
          handleToggle={handleToggle}
          tag={isEditing.current ? selectedTag : initialStateTag}
          handleTagForm={handleTagForm}
        />
      )}
    </>
  )
}
