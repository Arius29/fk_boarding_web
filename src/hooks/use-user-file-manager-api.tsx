import { UserFile } from '../pages/sherpas/interfaces/user-file'
import { fetchApi, fetchFromFormData } from '../utils/fetch-util'

export const useUserFileManagerApi = () => {
  const getUserFiles = async (userId: string) => {
    const url = `${process.env.VITE_API_URL!}/api/userfilemanager/get/${userId}`

    const response: UserFile[] = await fetchApi(url, 'GET', null)

    return response
  }

  const uploadUserFile = async (file: File, userId: string) => {
    const url = `${process.env.VITE_API_URL!}/api/userfilemanager/upload`
    const formData = new FormData()
    formData.append('file', file)
    formData.append('userId', userId)
    const response: string = await fetchFromFormData(url, formData)
    return response
  }

  const deleteUserFile = async (fileId: string) => {
    const url = `${process.env.VITE_API_URL!}/api/userfilemanager/delete/${fileId}`
    const response: string = await fetchApi(url, 'DELETE', null)
    return response
  }

  return { getUserFiles, uploadUserFile, deleteUserFile }
}
