import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'sonner'
import { WorkItemCategory } from '../pages/categories/interfaces/work-item-category'
import { useWorkItemCategoriesApi } from './use-work-item-categories-api'
import { WorkItemCategoryBase } from '../pages/categories/interfaces/work-item-category-base'
import { Process } from '../pages/process/interfaces/process'
import { useUserRole } from './use-user-role'

interface useWorkItemCategoriesApiQueryProps {
  processes: Process[]
  categoryId?: number
  processId?: number
  includeProcesses?: boolean
  includeWorkItems?: boolean
  enabled?: boolean
}

export const useWorkItemCategoriesApiQuery = ({
  processes = [],
  categoryId = undefined,
  processId = undefined,
  includeProcesses = false,
  includeWorkItems = false,
  enabled = true,
}: useWorkItemCategoriesApiQueryProps) => {
  const [categories, setCategories] = useState<WorkItemCategory[]>([])
  const { isAdmin, isUser, isObserver } = useUserRole()
  const { getCategories, createCategory, updateCategory, deleteCategory } =
    useWorkItemCategoriesApi()
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories', categoryId, processId],
    queryFn: () => {
      if (!isAdmin() && !isUser() && !isObserver())
        throw new Error('You are not authorized to get categories')

      return getCategories({
        categoryId,
        processId,
        includeProcesses,
        includeWorkItems,
      })
    },
    staleTime: 300000,
    cacheTime: 600000,
    enabled: enabled,
    onError: (error: Error) => {
      toast.error(
        error?.message || 'An error occurred while trying to get categories'
      )
    },
  })

  const mutationAddCategory = useMutation({
    mutationFn: (category: WorkItemCategory) => {
      if (!isAdmin())
        throw new Error('You are not authorized to create a category')
      return createCategory([
        {
          name: category.name,
          processId: category.processId,
          order: category.order,
        },
      ])
    },

    onSuccess: (data: WorkItemCategoryBase[]) => {
      const newCategories = data.map((category) => {
        const process = processes.find((p) => p.id === category.processId)
        return {
          ...category,
          process: process || undefined,
        }
      })
      setCategories([...categories, ...newCategories])
      toast.success('Category created successfully')
    },
    onError: (error: Error) => {
      toast.error(
        error?.message ||
          'An error occurred while trying to create a category, please try again'
      )
    },
  })

  const mutationEditCategory = useMutation({
    mutationFn: (category: WorkItemCategory) => {
      if (!isAdmin())
        throw new Error('You are not authorized to update a category')
      return updateCategory([
        {
          id: category.id,
          name: category.name,
          processId: category.processId,
          order: category.order,
        },
      ])
    },
    onSuccess: (data: WorkItemCategoryBase[]) => {
      setCategories(
        categories.map((category) => {
          const updateCategory = data.find((c) => c.id === category.id)
          if (category.id === updateCategory?.id) {
            return {
              ...updateCategory,
              process: processes.find((p) => p.id === updateCategory.processId),
            }
          }
          return category
        })
      )
      toast.success('Category updated successfully')
    },
    onError: (error: Error) => {
      toast.error(
        error?.message ||
          'An error occurred while trying to update a category, please try again'
      )
    },
  })

  const mutationDeleteCategory = useMutation({
    mutationFn: (category: WorkItemCategory) => {
      if (!isAdmin())
        throw new Error('You are not authorized to delete a category')
      return deleteCategory([category])
    },
    onSuccess: (data: WorkItemCategoryBase[]) => {
      setCategories(
        categories.filter(
          (category) => category.id !== data.find((c) => c.id)?.id
        )
      )
      toast.success('Category deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(
        error?.message ||
          'An error occurred while trying to delete a category, please try again'
      )
    },
  })

  useEffect(() => {
    if (data) {
      setCategories(data)
    }
  }, [data])

  return {
    categories,
    processes,
    setCategories,
    isLoading,
    error,
    mutationAddCategory,
    mutationEditCategory,
    mutationDeleteCategory,
  }
}
