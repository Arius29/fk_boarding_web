import { useEffect, useState } from 'react'
import { useProcessUserApi } from './use-process-user-api'
import { ProcessUser } from '../pages/sherpas-process/interfaces/process-user'
import { useMutation, useQuery } from 'react-query'
import { useMsal } from '@azure/msal-react'
import { toast } from 'sonner'
import { AccountInfo } from '@azure/msal-browser'
import { Type, User } from '../pages/sherpas/interfaces/user'
import { getAvatarRandom } from '../utils/avatar-util'
import { ProcessUserBase } from '../pages/sherpas-process/interfaces/process-user-base'
import { Process } from '../pages/process/interfaces/process'
import { ProcessUserForm } from '../pages/sherpas-process/interfaces/process-user-form'
import { useUserRole } from './use-user-role'

interface useProcessUserApiQueryProps {
  proccesses: Process[]
  processId?: number
  userId?: string
  includeProcess?: boolean
  includeUsers?: boolean
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

const createStarterFinisherByUser = (
  account: AccountInfo,
  processUser: ProcessUser
) => {
  const starter =
    processUser?.starter ||
    (processUser.status === 1 && !processUser.startedBy
      ? createBaseUser(account)
      : null)

  const finisher =
    processUser?.finisher ||
    (processUser.status === 2 && !processUser.finishedBy
      ? createBaseUser(account)
      : null)

  return {
    userId: processUser.user?.id || processUser.userId,
    startedOn:
      processUser.status === 1 && !processUser.startedOn
        ? new Date().toISOString()
        : processUser.startedOn || null,
    startedBy: starter?.id || null,
    finishedBy: finisher?.id || null,
    finishedOn:
      processUser.status === 2 && !processUser.finishedOn
        ? new Date().toISOString()
        : processUser.finishedOn || null,
    starter: starter,
    finisher: finisher,
  }
}

export const useProcessUserApiQuery = ({
  proccesses = [],
  processId = undefined,
  userId = undefined,
  includeProcess = false,
  includeUsers = false,
  enabled = true,
}: useProcessUserApiQueryProps) => {
  const [processesUsers, setProcessesUsers] = useState<ProcessUser[]>([])
  const { isAdmin, isUser, isObserver } = useUserRole()
  const { accounts } = useMsal()
  const account = accounts[0]
  const {
    getProcessUsers,
    createProcessUser,
    updateProcessUser,
    deleteProcessUser,
  } = useProcessUserApi()

  const { data, isLoading, error } = useQuery({
    queryKey: ['processesUsers', processId],
    queryFn: () => {
      if (!isAdmin() && !isUser() && !isObserver())
        throw new Error('You are not authorized to get processes users')
      return getProcessUsers({
        processId,
        userId,
        includeProcess,
        includeUsers,
      })
    },
    staleTime: 300000,
    cacheTime: 600000,
    enabled: enabled,
    onError: (error: Error) => {
      toast.error(
        error?.message ||
          'An error occurred while trying to get processes users'
      )
    },
  })

  const mutationAddProcessUser = useMutation({
    mutationFn: (processUser: ProcessUserForm) => {
      if (!isAdmin() && !isUser())
        throw new Error('You are not authorized to create a process user')
      return createProcessUser({
        processId: processUser.processId,
        user: processUser.user ?? createBaseUser(account),
        status: processUser.status,
        autoAddWorkItemsUser: processUser.autoAddWorkItemsUser || false,
        ...createStarterFinisherByUser(account, processUser),
      })
    },
    onSuccess: (data: ProcessUserBase, context) => {
      setProcessesUsers([
        ...processesUsers,
        {
          ...data,
          ...createStarterFinisherByUser(account, data),
          user: context.user,
          process: proccesses.find((process) => process.id === data.processId),
        },
      ])
      toast.success('Process user created successfully')
    },
    onError: (error: Error) => {
      toast.error(
        error?.message ||
          'An error occurred while trying to create a process user, please try again'
      )
    },
  })

  const mutationEditProcessUser = useMutation({
    mutationFn: (processUser: ProcessUser) => {
      if (!isAdmin() && !isUser())
        throw new Error('You are not authorized to update a process user')
      return updateProcessUser({
        processId: processUser.processId,
        user: processUser.user ?? createBaseUser(account),
        status: processUser.status,
        ...createStarterFinisherByUser(account, processUser),
      })
    },
    onSuccess: (data: ProcessUserBase, context: ProcessUser) => {
      setProcessesUsers(
        processesUsers.map((process) => {
          if (
            process.processId === data.processId &&
            process.userId === data.userId
          ) {
            return {
              ...context,
              ...data,
              ...createStarterFinisherByUser(account, context),
              process: proccesses.find(
                (process) => process.id === data.processId
              ),
            }
          }
          return process
        })
      )
      toast.success('Process user updated successfully')
    },
    onError: (error: Error) => {
      toast.error(
        error?.message ||
          'An error occurred while trying to update a process user, please try again'
      )
    },
  })

  const mutationDeleteProcessUser = useMutation({
    mutationFn: (processUser: ProcessUser) => {
      if (!isAdmin() && !isUser())
        throw new Error('You are not authorized to delete a process user')
      return deleteProcessUser({
        processId: processUser.processId,
        userId: processUser.user?.id || processUser.userId,
      })
    },
    onSuccess: (data: ProcessUserBase) => {
      setProcessesUsers(
        processesUsers.filter(
          (process) =>
            process.processId !== data.processId &&
            process.userId !== data.userId
        )
      )
      toast.success('Process user deleted successfully')
    },
    onError: (error: Error) => {
      toast.error(
        error?.message ||
          'An error occurred while trying to delete a process user, please try again'
      )
    },
  })

  useEffect(() => {
    if (data) {
      setProcessesUsers(data)
    }
  }, [data])

  return {
    processesUsers,
    setProcessesUsers,
    isLoading,
    error,
    mutationAddProcessUser,
    mutationEditProcessUser,
    mutationDeleteProcessUser,
  }
}
