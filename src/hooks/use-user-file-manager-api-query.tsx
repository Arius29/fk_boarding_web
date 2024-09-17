import { useEffect, useState } from 'react'
import { UserFile } from '../pages/sherpas/interfaces/user-file'
import { useUserFileManagerApi } from './use-user-file-manager-api'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'sonner'
import { CreateUserFile } from '../pages/sherpas/interfaces/create-user-file'
export const useUserFileManagerApiQuery = (userId: string) => {
  const [userFiles, setUserFiles] = useState<UserFile[]>([])

  const { getUserFiles, uploadUserFile, deleteUserFile } =
    useUserFileManagerApi()
  const { data, isLoading, error } = useQuery({
    queryKey: ['userFiles', userId],
    queryFn: () => getUserFiles(userId),
    staleTime: 300000,
    cacheTime: 600000,
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
    onSuccess: (fileName: string, createUserFile: CreateUserFile) => {
      console.log(fileName)
      console.log(createUserFile)
      // const reader = new FileReader()
      // reader.onloadend = () => {
      //   setUserFiles([
      //     ...userFiles,
      //     {
      //       fileName: fileName,
      //       contentType: createUserFile.file.type,
      //       fileData: reader.result as string,
      //     },
      //   ])

      //   toast.success('User file created successfully')
      // }

      // reader.readAsDataURL(createUserFile.file)
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
    onSuccess: (data: string) => {
      setUserFiles(userFiles.filter((userFile) => userFile.fileName !== data))
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
