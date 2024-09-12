import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { CreateNewPasswordForm, FormValues } from '@/components/forms'
import { useResetPasswordMutation } from '@/services'
import { PATH } from '@/shared/enums'
import { FlexContainer } from '@/shared/ui/flex-container'
import { Page } from '@/shared/ui/page'
import { getErrorMessageData } from '@/shared/utils'

export const ResetPasswordPage = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const { token } = useParams()

  const navigate = useNavigate()

  const resetPasswordHandler = (formData: FormValues) => {
    if (token) {
      resetPassword({ password: formData.password, token })
        .unwrap()
        .then(() => {
          navigate(PATH.SIGN_IN)
          toast.success('Password reset successfully!')
        })
        .catch(e => {
          const errors = getErrorMessageData(e)

          toast.error(errors as any)
        })
    } else {
      toast.warning('No token found')
    }
  }

  return (
    <Page load={isLoading}>
      <FlexContainer jc={'center'} pd={'0 20px'}>
        <CreateNewPasswordForm onSubmit={resetPasswordHandler} />
      </FlexContainer>
    </Page>
  )
}
