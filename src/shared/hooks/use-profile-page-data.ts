import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  useDeleteUserMutation,
  useLogoutMutation,
  useMeQuery,
  useUpdateUserMutation,
} from '@/services'
import { PATH } from '@/shared/enums'

import { getErrorMessageData } from '../utils'

export const useProfilePageData = () => {
  const { data: user, isFetching } = useMeQuery()
  const [isEditMode, setIsEditMode] = useState(false)

  const [logout, { isLoading: isLoadingLogOut }] = useLogoutMutation()
  const [updateUser, { isLoading: isLoadingUpdateUser }] = useUpdateUserMutation()
  const [deleteUser, { isLoading: isLoadingDeleteUser }] = useDeleteUserMutation()

  const navigate = useNavigate()

  const logoutHandler = () => {
    logout()
      .unwrap()
      .then(() => toast.success('You logout successfully'))
      .catch(e => {
        const errors = getErrorMessageData(e)

        toast.error(errors as any)
      })
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      updateUser({ avatar: file })
        .unwrap()
        .then(() => toast.success('Avatar has been successfully changed'))
        .catch(e => {
          const errors = getErrorMessageData(e)

          toast.error(errors as any)
        })
    }
  }

  const editNameHandler = () => {
    setIsEditMode(true)
  }

  const deleteAvatarHandler = () => {
    updateUser({ avatar: '' })
      .unwrap()
      .then(() => toast.success('Avatar has been successfully deleted'))
      .catch(e => {
        const errors = getErrorMessageData(e)

        toast.error(errors as any)
      })
  }

  const saveNameHandler = (data: { nickname: string }) => {
    const { nickname } = data

    if (nickname === user?.name) {
      setIsEditMode(false)
      toast.info('No changes detected')

      return
    }

    updateUser({ name: nickname })
      .unwrap()
      .then(() => {
        toast.success('Name has been successfully changed')
        setIsEditMode(false)
      })
      .catch(e => {
        const errors = getErrorMessageData(e)

        toast.error(errors as any)
      })
  }

  const cancelPersonalInfoHandler = () => {
    setIsEditMode(false)
  }

  const deleteUserHandler = () => {
    deleteUser()
      .unwrap()
      .then(() => {
        toast.success('User was deleted successfully')
        navigate(PATH.SIGN_IN)
      })
      .catch(e => {
        toast.error(`User wasn't deleted, ${e.error}`)
      })
  }

  const isLoading = isLoadingUpdateUser || isFetching || isLoadingLogOut || isLoadingDeleteUser

  return {
    cancelPersonalInfoHandler,
    deleteAvatarHandler,
    deleteUserHandler,
    editNameHandler,
    isEditMode,
    isLoading,
    logoutHandler,
    saveNameHandler,
    uploadHandler,
    user,
  }
}
