import { CreateTag } from '../pages/tags/interfaces/create-tag'
import { EditTag } from '../pages/tags/interfaces/edit-tag'
import { Tag } from '../pages/tags/interfaces/tag'
import { fetchApi } from '../utils/fetch-util'
export const useTagsApi = () => {
  const getTags = async () => {
    const url = `${process.env.VITE_API_URL!}/api/tag/get`

    const response: Tag[] = await fetchApi(url, 'GET', null)

    return response
  }

  const createTag = async (tag: CreateTag) => {
    const url = `${process.env.VITE_API_URL!}/api/tag/create`
    const response: Tag = await fetchApi(url, 'POST', tag)
    return response
  }

  const updateTag = async (tag: EditTag) => {
    const url = `${process.env.VITE_API_URL!}/api/tag/update`
    const response: Tag = await fetchApi(url, 'PATCH', tag)
    return response
  }

  const deleteTag = async (tagId: number) => {
    const url = `${process.env.VITE_API_URL!}/api/tag/delete/${tagId}`
    const response: Tag = await fetchApi(url, 'DELETE', null)
    return response
  }

  return {
    getTags,
    createTag,
    updateTag,
    deleteTag,
  }
}
