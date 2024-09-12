import { Link } from 'react-router-dom'

import { EmailOk } from '@/assets/icons'
import { Button, Card, Typography } from '@/components/ui/primitives'
import { PATH } from '@/shared/enums'
import { FlexContainer } from '@/shared/ui/flex-container'

import { cn } from './confirm-email.styles'

export const ConfirmEmail = () => {
  return (
    <Card className={cn.container}>
      <FlexContainer fd={'column'} gap={'10px'} jc={'center'} pd={'0 0 20px 0'}>
        <FlexContainer gap={'10px'} jc={'center'}>
          <Typography variant={'h3'}>You confirmed your email successfully</Typography>
          <EmailOk />
        </FlexContainer>
      </FlexContainer>
      <Button as={Link} to={PATH.ROOT}>
        Back to home page
      </Button>
    </Card>
  )
}
