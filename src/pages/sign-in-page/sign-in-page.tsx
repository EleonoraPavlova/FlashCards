import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { LoginFormValues, SignInForm } from '@/components/forms'
import { useLoginMutation } from '@/services'
import { PATH } from '@/shared/enums'
import { FlexContainer } from '@/shared/ui/flex-container'
import { Page } from '@/shared/ui/page'
import { getErrorMessageData } from '@/shared/utils'

export const SignInPage = () => {
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  const signInHandler = (formData: LoginFormValues) => {
    login(formData)
      .unwrap()
      .then(() => {
        navigate(PATH.ROOT)
        toast.success('You have successfully logged in')
      })
      .catch(e => {
        const errors = getErrorMessageData(e)

        toast.error(errors as any)
      })
  }

  return (
    <Page load={isLoading}>
      <FlexContainer jc={'center'} pd={'0 20px'}>
        <SignInForm onSubmit={signInHandler} />
      </FlexContainer>
    </Page>
  )
}
