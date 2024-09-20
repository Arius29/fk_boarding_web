import { CreateWorkItemCategory } from '../pages/categories/interfaces/create-work-item-category'
import { UpdateWorkItemCategory } from '../pages/categories/interfaces/update-work-item-category'
import { WorkItemCategory } from '../pages/categories/interfaces/work-item-category'
import { WorkItemCategoryBase } from '../pages/categories/interfaces/work-item-category-base'
import { fetchApi } from '../utils/fetch-util'

interface GetCategoriesProps {
  categoryId?: number
  processId?: number
  includeProcesses?: boolean
  includeWorkItems?: boolean
}

export const useWorkItemCategoriesApi = () => {
  const getCategories = async ({
    categoryId = undefined,
    processId = undefined,
    includeProcesses = false,
    includeWorkItems = false,
  }: GetCategoriesProps) => {
    const url = `${process.env.VITE_API_URL!}/api/category/get?${categoryId ? `categoryId=${categoryId}&` : ''}${processId ? `processId=${processId}&` : ''}processId=&includeProcesses=${includeProcesses}&includeWorkItems=${includeWorkItems}`

    const response: WorkItemCategory[] = await fetchApi(url, 'GET', null)

    return response
  }

  const createCategory = async (createCategory: CreateWorkItemCategory[]) => {
    const url = `${process.env.VITE_API_URL!}/api/category/create`
    const response: WorkItemCategoryBase[] = await fetchApi(
      url,
      'POST',
      createCategory
    )
    return response
  }

  const updateCategory = async (updateCategories: UpdateWorkItemCategory[]) => {
    const url = `${process.env.VITE_API_URL!}/api/category/update`
    const response: WorkItemCategoryBase[] = await fetchApi(
      url,
      'PATCH',
      updateCategories
    )
    return response
  }

  const deleteCategory = async (categories: WorkItemCategoryBase[]) => {
    const url = `${process.env.VITE_API_URL!}/api/category/delete`
    const response: WorkItemCategoryBase[] = await fetchApi(
      url,
      'DELETE',
      categories
    )
    return response
  }

  return { getCategories, createCategory, updateCategory, deleteCategory }
}
