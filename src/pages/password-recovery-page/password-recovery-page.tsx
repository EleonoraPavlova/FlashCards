import { useState } from 'react'
import { toast } from 'react-toastify'

import { ForgotPasswordForm, ForgotPasswordFormValues } from '@/components/forms'
import { CheckEmail } from '@/components/ui/layout-components'
import { useRecoveryPasswordMutation } from '@/services'
import { FlexContainer } from '@/shared/ui/flex-container'
import { Page } from '@/shared/ui/page'
import { getErrorMessageData } from '@/shared/utils'

export const PasswordRecoveryPage = () => {
  const [recoverPassword, { isLoading, isSuccess }] = useRecoveryPasswordMutation()
  const [email, setEmail] = useState('')
  const [forRecoveryPassword, setForRecoveryPassword] = useState(false)

  const recoveryPasswordHandler = ({ email }: ForgotPasswordFormValues) => {
    recoverPassword({ email })
      .unwrap()
      .then(() => {
        setEmail(email)
        setForRecoveryPassword(true)
      })
      .catch(e => {
        const errors = getErrorMessageData(e)

        toast.error(errors as any)
      })
  }

  return (
    <Page load={isLoading}>
      <FlexContainer jc={'center'} pd={'0 20px'}>
        {isSuccess ? (
          <CheckEmail email={email} forRecoveryPassword={forRecoveryPassword} />
        ) : (
          <ForgotPasswordForm onSubmit={recoveryPasswordHandler} />
        )}
      </FlexContainer>
    </Page>
  )
}
