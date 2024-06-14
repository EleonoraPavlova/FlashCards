import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { ControlledCheckbox } from '@/components/ui/form-components/controlled-checkbox'
import { ControlledSelect } from '@/components/ui/form-components/controlled-select'
import { FlexContainer } from '@/shared/ui/flex-container'
import { Layout } from '@/shared/ui/layout'

import { Header } from './shared/ui/header'
import { Page } from './shared/ui/page'

type SomeFormValues = {
  rememberMe: boolean
  someSelect: string
}

export function App() {
  const { control, handleSubmit } = useForm<SomeFormValues>()

  const foo = handleSubmit(data => {
    console.log(data)
  })

  const mockSelectOptions = [
    { title: 'option 1', value: 'option-1' },
    { title: 'option 2', value: 'option-2' },
    { title: 'option 3', value: 'option-3' },
  ]

  return (
    <Layout>
      <Header />
      <Page>
        <form onSubmit={foo}>
          <FlexContainer ai={'start'} fd={'column'} gap={'10px'} style={{ maxWidth: '500px' }}>
            <div>Hi Team 🤘🤘🤘 Controlled components examples:</div>
            <ControlledCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
            <ControlledSelect control={control} name={'someSelect'} options={mockSelectOptions} />
            <Button>Submit</Button>
          </FlexContainer>
        </form>
      </Page>
    </Layout>
  )
}
