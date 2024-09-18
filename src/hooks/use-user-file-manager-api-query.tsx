import { useEffect, useState } from 'react'
import { UserFile } from '../pages/sherpas/interfaces/user-file'
import { useUserFileManagerApi } from './use-user-file-manager-api'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'sonner'
import { CreateUserFile } from '../pages/sherpas/interfaces/create-user-file'
export const useUserFileManagerApiQuery = (
  userId: string,
  enabled: boolean = true
) => {
  const [userFiles, setUserFiles] = useState<UserFile[]>([])

  const { getUserFiles, uploadUserFile, deleteUserFile } =
    useUserFileManagerApi()
  const { data, isLoading, error } = useQuery({
    queryKey: ['userFiles', userId],
    queryFn: () => getUserFiles(userId),
    staleTime: 300000,
    cacheTime: 600000,
    enabled: enabled,
    onError: () => {
      toast.error('An error occurred while trying to get user files')
    },
  })

  const mutationUploadUserFile = useMutation({
    mutationFn: (createUserFile: CreateUserFile) => {
      return uploadUserFile(
        createUserFile.file,
        createUserFile.userId ?? userId
      )
    },
    onSuccess: (fileName: string, context: CreateUserFile) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setUserFiles((prev) => [
          ...prev,
          {
            fileName: fileName,
            contentType: context.file.type,
            fileData: result.split(',')[1],
          },
        ])

        toast.success('User file created successfully')
      }

      reader.readAsDataURL(context.file)
    },
    onError: () => {
      toast.error(
        'An error occurred while trying to upload a user file, please try again'
      )
    },
  })

  const mutationDeleteUserFile = useMutation({
    mutationFn: (userFileId: string) => {
      return deleteUserFile(userFileId)
    },
    onSuccess: (userFileId: string) => {
      setUserFiles(
        userFiles.filter((userFile) => userFile.fileName !== userFileId)
      )
      toast.success('User file deleted successfully')
    },
    onError: () => {
      toast.error(
        'An error occurred while trying to delete a user file, please try again'
      )
    },
  })

  useEffect(() => {
    if (data) {
      setUserFiles(data)
    }
  }, [data])

  return {
    userFiles,
    setUserFiles,
    isLoading,
    error,
    mutationUploadUserFile,
    mutationDeleteUserFile,
  }
}
