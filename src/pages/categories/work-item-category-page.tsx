import { Toaster } from 'sonner'
import { Title } from '../../components/common/core/title'
import { useRef, useState } from 'react'
import { SearchBar } from '../../components/common/search/search-bar'
import { PrimaryButton } from '../../components/common/buttons/primary-button'
import { TablePagination } from '../../components/common/table/table-pagination'
import { useTablePagination } from '../../hooks/use-table-pagination'
import { WorkItemCategory } from './interfaces/work-item-category'
import { TableCategories } from './components/table-categories'
import { useWorkItemCategoriesApiQuery } from '../../hooks/use-work-item-categories-api-query'
import { sortArray, sortArrayDoubleKey } from '../../utils/array-utils'
import { EditCategoryModal } from './components/edit-category-modal'
import { useProcessApiQuery } from '../../hooks/use-process-api-query'

const filterCategories = (
  categories: WorkItemCategory[],
  searchValue: string
) => {
  return categories.filter((category) => {
    return (
      category.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      category.process?.name.toLowerCase().includes(searchValue.toLowerCase())
    )
  })
}

const sortCategories = (
  key: keyof WorkItemCategory,
  categories: WorkItemCategory[],
  sortOrder: SortOrder
) => {
  switch (key) {
    case 'name':
      return sortArray(categories, key, sortOrder)
    case 'processId':
      return sortArrayDoubleKey(categories, 'process', 'name', sortOrder)
    default:
      return sortArray(categories, key, sortOrder)
  }
}

type SortOrder = 'asc' | 'desc'

const initialStateCategory: WorkItemCategory = {
  id: 0,
  name: '',
  processId: 0,
  order: 0,
}

export const WorkItemCategoryPage = () => {
  const [showModal, setShowModal] = useState(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedCategory, setSelectedCategory] =
    useState<WorkItemCategory>(initialStateCategory)
  const sortConfig = useRef<SortOrder>('asc')
  const searchBarRef = useRef<HTMLInputElement>(null)
  const isEditing = useRef<boolean>(false)
  const { processes } = useProcessApiQuery()
  const {
    categories,
    setCategories,
    mutationAddCategory,
    mutationEditCategory,
    mutationDeleteCategory,
  } = useWorkItemCategoriesApiQuery(
    processes,
    undefined,
    undefined,
    true,
    false
  )
  const handleSearch = (query: string) => {
    setSearchValue(query)
  }

  const handleCategoryForm = (category: WorkItemCategory) => {
    if (isEditing.current) mutationEditCategory.mutate(category)
    else mutationAddCategory.mutate(category)
    handleToggle()
  }

  const handleDeleteCategory = (id: number) => {
    const category = categories.find((category) => category.id === id)
    if (!category) return
    mutationDeleteCategory.mutate(category)
  }

  const handleSelectCategory = (id: number) => {
    const category = categories.find((category) => category.id === id)
    if (!category) return
    setSelectedCategory(category)
    isEditing.current = true
    handleToggle()
  }

  const handleSortColumn = (key: keyof WorkItemCategory) => {
    sortConfig.current = sortConfig.current == 'asc' ? 'desc' : 'asc'
    setCategories(sortCategories(key, categories, sortConfig.current))
  }

  const handleToggle = () => setShowModal(!showModal)

  const { current, totalPages, handleChangePage, paginatedItems } =
    useTablePagination({
      items: filterCategories(categories, searchValue),
      itemsPerPage: 10,
      currentPage: 1,
    })

  return (
    <>
      <Toaster position="top-right" richColors />
      <Title>Categories</Title>
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
      <section className="sm:rounded-lg flex-1 flex flex-col justify-between items-center max-h-[calc(100vh-208px)]">
        <div className="flex-1 w-full overflow-y-auto">
          <TableCategories
            categories={paginatedItems}
            handleSelectCategory={handleSelectCategory}
            handleSortColumn={handleSortColumn}
            handleDeleteCategory={handleDeleteCategory}
          />
        </div>
        <TablePagination
          currentPage={current}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
      </section>
      {showModal && (
        <EditCategoryModal
          isEditing={isEditing.current}
          handleToggle={handleToggle}
          category={isEditing.current ? selectedCategory : initialStateCategory}
          processes={processes}
          handleProcessForm={handleCategoryForm}
        />
      )}
    </>
  )
}
