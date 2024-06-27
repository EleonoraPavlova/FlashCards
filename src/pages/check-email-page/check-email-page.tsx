import { CheckEmail } from '@/components/ui/check-email'
import { FlexContainer } from '@/shared/ui/flex-container'
import { Page } from '@/shared/ui/page'

export const CheckEmailPage = () => {
  const foo = () => {
    console.log('This is СheckEmail component, I need user email from RTK Query cash to display')

    return 'tes@test.com'
  }

  return (
    <Page>
      <FlexContainer jc={'center'}>
        <CheckEmail email={foo()} />
      </FlexContainer>
    </Page>
  )
}
