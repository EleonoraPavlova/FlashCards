import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { SignUpForm, SignUpFormValues } from '@/components/forms'
import { useCreateUserMutation } from '@/services'
import { PATH } from '@/shared/enums'
import { FlexContainer } from '@/shared/ui/flex-container'
import { Page } from '@/shared/ui/page'
import { getErrorMessageData } from '@/shared/utils'

export const SignUpPage = () => {
  const [createUser, { isLoading }] = useCreateUserMutation()

  const navigate = useNavigate()

  const signUpFormHandler = (formData: SignUpFormValues) => {
    createUser(formData)
      .unwrap()
      .then(() => {
        navigate(PATH.SIGN_IN)
        toast.success('You have successfully registered')
      })
      .catch(e => {
        const errors = getErrorMessageData(e)

        toast.error(errors as any)
      })
  }

  return (
    <Page load={isLoading}>
      <FlexContainer jc={'center'} pd={'0 20px'}>
        <SignUpForm onSubmit={signUpFormHandler} />
      </FlexContainer>
    </Page>
  )
}
