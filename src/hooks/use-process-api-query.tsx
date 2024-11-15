import { useMutation, useQuery } from 'react-query'
import { useProcessApi } from './use-process-api'
import { Process } from '../pages/process/interfaces/process'
import { useMsal } from '@azure/msal-react'
import { Type, User } from '../pages/sherpas/interfaces/user'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getAvatarRandom } from '../utils/avatar-util'
import { AccountInfo } from '@azure/msal-browser'
import { ProcessBase } from '../pages/process/interfaces/process-base'
import { useUserRole } from './use-user-role'

interface useProcessApiQueryProps {
  processId?: number
  includeCategories?: boolean
  includeWorkItems?: boolean
  includeUsers?: boolean
  includeTags?: boolean
  includeProcessUsers?: boolean
  omitWorkItemsAbandoned?: boolean
  enabled?: boolean
}

const createBaseUser = (account: AccountInfo): User => {
  return {
    id: account?.homeAccountId,
    name:
      account?.name || account?.username.split('@')[0].replace('.', '&') || '',
    avatar: getAvatarRandom(account?.name?.replace(' ', '+') || 'Sherpa User'),
    email: account?.username,
    type: Type.Azure,
  }
}

export const useProcessApiQuery = ({
  processId = undefined,
  includeCategories = false,
  includeWorkItems = false,
  includeUsers = false,
  includeTags = false,
  includeProcessUsers = false,
  omitWorkItemsAbandoned = false,
  enabled = true,
}: useProcessApiQueryProps) => {
  const [processes, setProcesses] = useState<Process[]>([])
  const { isAdmin, isUser, isObserver } = useUserRole()
  const { accounts } = useMsal()
  const account = accounts[0]

  const { getProceses, createProcess, updateProcess, deleteProcess } =
    useProcessApi()
  const { data, isLoading, error } = useQuery({
    queryKey: ['processes', processId],
    queryFn: () => {
      if (!isAdmin() && !isUser() && !isObserver())
        throw new Error('You are not authorized to get processes')

      return getProceses({
        processId,
        includeCategories,
        includeWorkItems,
        includeUsers,
        includeTags,
        includeProcessUsers,
        omitWorkItemsAbandoned,
      })
    },
    staleTime: 300000,
    cacheTime: 600000,
    enabled: enabled,
    onError: (error: Error) => {
      toast.error(
        error?.message || 'An error occurred while trying to get processes'
      )
    },
  })

  const mutationAddProcess = useMutation({
    mutationFn: (process: Process) => {
      if (!isAdmin())
        throw new Error('You are not authorized to create a process')

      return createProcess({
        name: process.name,
        description: process.description,
        creator: createBaseUser(account),
        createdOn: new Date().toISOString(),
      })
    },

    onSuccess: (data: ProcessBase) => {
      setProcesses([
        ...processes,
        {
          ...data,
          creator: createBaseUser(account),
        },
      ])
      toast.success('Process created successfully')
    },
    onError: (error: Error) => {
      toast.error(
        error.message ||
          'An error occurred while trying to create a process, please try again'
      )
    },
  })

  const mutationEditProcess = useMutation({
    mutationFn: (process: Process) => {
      if (!isAdmin())
        throw new Error('You are not authorized to update a process')
      return updateProcess({
        id: process.id,
        name: process.name,
        description: process.description,
      })
    },
    onSuccess: (data: ProcessBase) => {
      setProcesses(
        processes.map((process) => {
          if (process.id === data.id) {
            return { ...process, ...data }
          }
          return process
        })
      )
      toast.success('Process updated successfully')
    },
    onError: (error: Error) => {
      toast.error(
        error.message ||
          'An error occurred while trying to update a process, please try again'
      )
    },
  })

  const mutationDeleteProcess = useMutation({
    mutationFn: (id: number) => {
      if (!isAdmin())
        throw new Error('You are not authorized to delete a process')
      return deleteProcess(id)
    },
    onSuccess: (data: ProcessBase) => {
      setProcesses(processes.filter((process) => process.id !== data.id))
      toast.success('Process deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(
        error.message ||
          'An error occurred while trying to delete a process, please try again'
      )
    },
  })

  useEffect(() => {
    if (data) {
      setProcesses(data)
    }
  }, [data])

  return {
    processes,
    setProcesses,
    isLoading,
    error,
    mutationAddProcess,
    mutationEditProcess,
    mutationDeleteProcess,
  }
}
