import { useEffect, useState } from 'react'
import { Tag } from '../pages/tags/interfaces/tag'
import { useMutation, useQuery } from 'react-query'
import { useTagsApi } from './use-tags-api'
import { toast } from 'sonner'
import { useUserRole } from './use-user-role'

export const useTagsApiQuery = (enabled: boolean = true) => {
  const [tags, setTags] = useState<Tag[]>([])

  const { getTags, createTag, updateTag, deleteTag } = useTagsApi()
  const { isAdmin, isUser, isObserver } = useUserRole()
  const { data, isLoading, error } = useQuery({
    queryKey: 'tags',
    queryFn: () => {
      if (!isAdmin() && !isUser() && !isObserver())
        throw new Error('You are not authorized to get tags')
      return getTags()
    },
    staleTime: 300000,
    cacheTime: 600000,
    onError: (error: Error) => {
      toast.error(
        error?.message || 'An error occurred while trying to get tags'
      )
    },
    enabled: enabled,
  })

  const mutationAddTag = useMutation({
    mutationFn: (tag: Tag) => {
      if (!isAdmin()) throw new Error('You are not authorized to create tags')
      return createTag({
        name: tag.name,
        description: tag.description,
        hexColor: tag.hexColor,
      })
    },
    onSuccess: (data) => {
      setTags([...tags, data])
      toast.success('Tag created successfully')
    },
    onError: (error: Error) => {
      toast.error(
        error?.message ||
          'An error occurred while trying to create a tag, please try again'
      )
    },
  })

  const mutationEditProcess = useMutation({
    mutationFn: (tag: Tag) => {
      if (!isAdmin()) throw new Error('You are not authorized to update tags')
      return updateTag({
        id: tag.id,
        name: tag.name,
        description: tag.description,
        hexColor: tag.hexColor,
      })
    },
    onSuccess: (data) => {
      setTags(
        tags.map((tag) => {
          if (tag.id === data.id) {
            return { ...tag, ...data }
          }
          return tag
        })
      )
      toast.success('Tag updated successfully')
    },
    onError: (error: Error) => {
      toast.error(
        error?.message ||
          'An error occurred while trying to update a tag, please try again'
      )
    },
  })

  const mutationDeleteProcess = useMutation({
    mutationFn: (id: number) => {
      if (!isAdmin()) throw new Error('You are not authorized to delete tags')
      return deleteTag(id)
    },
    onSuccess: (data) => {
      setTags(tags.filter((tag) => tag.id !== data.id))
      toast.success('Tag deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(
        error?.message ||
          'An error occurred while trying to delete a tag, please try again'
      )
    },
  })

  useEffect(() => {
    if (data) {
      setTags(data)
    }
  }, [data])

  return {
    tags,
    setTags,
    isLoading,
    error,
    mutationAddTag,
    mutationEditProcess,
    mutationDeleteProcess,
  }
}
