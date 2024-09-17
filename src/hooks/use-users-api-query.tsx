import { useMutation, useQuery } from 'react-query'
import { Type, User } from '../pages/sherpas/interfaces/user'
import { useUsersApi } from './use-users-api'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { getAvatarRandom } from '../utils/avatar-util'

export const useUsersApiQuery = (
  userId?: string,
  includeReporters: boolean = false,
  includeRecipients = false,
  includeProcessUsers = false,
  includeWorkItems = false
) => {
  const [users, setUsers] = useState<User[]>([])
  const { getUsers, createUser, updateUser, deleteUser } = useUsersApi()
  const { data, isLoading, error } = useQuery({
    queryKey: ['users', userId],
    queryFn: () =>
      getUsers(
        userId,
        includeReporters,
        includeRecipients,
        includeProcessUsers,
        includeWorkItems
      ),
    staleTime: 300000,
    cacheTime: 600000,
    onError: () => {
      toast.error('An error occurred while trying to get users')
    },
  })

  const mutationAddUser = useMutation({
    mutationFn: (user: User) => {
      return createUser({
        email: user.email,
        name: user.name,
        type: Type.Temporally,
        uid: user.uid ?? '',
        address: user.address,
        avatar:
          user.avatar ??
          getAvatarRandom(user.name.replace(' ', '+') || 'Sherpa User'),
        phoneNumber: user.phoneNumber,
        matiralStatus: user.matiralStatus,
        haveChildren: user.haveChildren,
        position: user.position,
        birthDate: user.birthDate,
        hobbies: user.hobbies,
        notes: user.notes,
      })
    },
    onSuccess: (data) => {
      setUsers([...users, data])
      toast.success('User created successfully')
    },
    onError: () => {
      toast.error(
        'An error occurred while trying to create a user, please try again'
      )
    },
  })

  const mutationEditUser = useMutation({
    mutationFn: (user: User) => {
      return updateUser({
        id: user.id,
        email: user.email,
        name: user.name,
        uid: user.uid,
        address: user.address,
        avatar:
          user.avatar ??
          getAvatarRandom(user.name.replace(' ', '+') || 'Sherpa User'),
        phoneNumber: user.phoneNumber,
        matiralStatus: user.matiralStatus,
        haveChildren: user.haveChildren,
        position: user.position,
        birthDate: user.birthDate,
        hobbies: user.hobbies,
        notes: user.notes,
      })
    },
    onSuccess: (data) => {
      setUsers(
        users.map((user) => {
          if (user.id === data.id) {
            return { ...user, ...data }
          }
          return user
        })
      )

      toast.success('User updated successfully')
    },
    onError: () => {
      toast.error(
        'An error occurred while trying to update a user, please try again'
      )
    },
  })

  const mutationDeleteUser = useMutation({
    mutationFn: (userId: string) => {
      return deleteUser(userId)
    },
    onSuccess: (data) => {
      setUsers(users.filter((user) => user.id !== data.id))
      toast.success('User deleted successfully')
    },
    onError: () => {
      toast.error(
        'An error occurred while trying to delete a user, please try again'
      )
    },
  })

  useEffect(() => {
    if (data) {
      setUsers(data)
    }
  }, [data])

  return {
    users,
    setUsers,
    isLoading,
    error,
    mutationAddUser,
    mutationEditUser,
    mutationDeleteUser,
  }
}
