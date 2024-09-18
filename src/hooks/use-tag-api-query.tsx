import { useEffect, useState } from 'react'
import { Tag } from '../pages/tags/interfaces/tag'
import { useMutation, useQuery } from 'react-query'
import { useTagsApi } from './use-tags-api'
import { toast } from 'sonner'

export const useTagsApiQuery = (enabled: boolean = true) => {
  const [tags, setTags] = useState<Tag[]>([])

  const { getTags, createTag, updateTag, deleteTag } = useTagsApi()
  const { data, isLoading, error } = useQuery({
    queryKey: 'tags',
    queryFn: () => getTags(),
    staleTime: 300000,
    cacheTime: 600000,
    onError: () => {
      toast.error('An error occurred while trying to get tags')
    },
    enabled: enabled,
  })

  const mutationAddTag = useMutation({
    mutationFn: (tag: Tag) => {
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
    onError: () => {
      toast.error(
        'An error occurred while trying to create a tag, please try again'
      )
    },
  })

  const mutationEditProcess = useMutation({
    mutationFn: (tag: Tag) => {
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
    onError: () => {
      toast.error(
        'An error occurred while trying to update a tag, please try again'
      )
    },
  })

  const mutationDeleteProcess = useMutation({
    mutationFn: (id: number) => {
      return deleteTag(id)
    },
    onSuccess: (data) => {
      setTags(tags.filter((tag) => tag.id !== data.id))
      toast.success('Tag deleted successfully')
    },
    onError: () => {
      toast.error(
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
