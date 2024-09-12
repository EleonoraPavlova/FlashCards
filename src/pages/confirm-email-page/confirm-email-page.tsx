import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ConfirmEmail } from '@/components/ui/layout-components/confirm-email'
import { LinkExpired } from '@/components/ui/layout-components/link-expired'
import { useVerifyEmailMutation } from '@/services'
import { FlexContainer } from '@/shared/ui/flex-container'
import { Page } from '@/shared/ui/page'

export const ConfirmEmailPage = () => {
  const { token } = useParams()

  const [verifyEmail, { isError, isLoading, isSuccess }] = useVerifyEmailMutation()

  useEffect(() => {
    if (token) {
      verifyEmail({ code: token })
        .unwrap()
        .then(() => {
          toast.success('Email verified successfully')
        })
    }
  }, [token])

  return (
    <Page load={isLoading}>
      <FlexContainer jc={'center'} pd={'0 20px'}>
        {isSuccess && <ConfirmEmail />}
        {isError && <LinkExpired />}
      </FlexContainer>
    </Page>
  )
}
