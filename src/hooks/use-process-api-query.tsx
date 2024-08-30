import { useMutation, useQuery } from 'react-query'
import { useProcessApi } from './use-process-api'
import { Process } from '../pages/process/interfaces/process'
import { useMsal } from '@azure/msal-react'
import { Type } from '../pages/sherpas/interfaces/user'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const useProcessApiQuery = (
  processId?: number,
  includeCategories: boolean = false,
  includeWorkItems: boolean = false,
  includeUsers: boolean = false,
  omitWorkItemsAbandoned: boolean = false
) => {
  const [processes, setProcesses] = useState<Process[]>([])
  const { accounts } = useMsal()
  const account = accounts[0]

  const { getProceses, createProcess, updateProcess, deleteProcess } =
    useProcessApi()
  const { data, isLoading, error } = useQuery({
    queryKey: 'processes',
    queryFn: () =>
      getProceses(
        processId,
        includeCategories,
        includeWorkItems,
        includeUsers,
        omitWorkItemsAbandoned
      ),
    staleTime: 300000,
    cacheTime: 600000,
    onError: () => {
      toast.error('An error occurred while trying to get processes')
    },
  })

  const mutationAddProcess = useMutation({
    mutationFn: (process: Process) => {
      return createProcess({
        name: process.name,
        description: process.description,
        createdBy: account?.homeAccountId,
        createdOn: new Date().toISOString(),
        avatar: '',
        email: account?.username,
        type: Type.Azure,
        userName: account?.name,
      })
    },
    onSuccess: (data) => {
      setProcesses([...processes, data])
      toast.success('Process created successfully')
    },
    onError: () => {
      toast.error(
        'An error occurred while trying to create a process, please try again'
      )
    },
  })

  const mutationEditProcess = useMutation({
    mutationFn: (process: Process) => {
      return updateProcess({
        id: process.id,
        name: process.name,
        description: process.description,
      })
    },
    onSuccess: (data) => {
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
    onError: () => {
      toast.error(
        'An error occurred while trying to update a process, please try again'
      )
    },
  })

  const mutationDeleteProcess = useMutation({
    mutationFn: (id: number) => {
      return deleteProcess(id)
    },
    onSuccess: (data) => {
      setProcesses(processes.filter((process) => process.id !== data.id))
      toast.success('Process deleted successfully')
    },
    onError: () => {
      toast.error(
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
