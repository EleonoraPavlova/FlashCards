import { Link } from 'react-router-dom'

import { Button, Card, Typography } from '@/components/ui/primitives'
import { PATH } from '@/shared/enums'
import { FlexContainer } from '@/shared/ui/flex-container'

import { cn } from './link-expired.styles'

export const LinkExpired = () => {
  return (
    <Card className={cn.container}>
      <FlexContainer fd={'column'} gap={'10px'} jc={'center'} pd={'0 0 20px 0'}>
        <Typography variant={'h3'}>{'Link expired'}</Typography>
        <Typography gray>
          The email confirmation link has expired. This may have happened because the link was used
          once or it expired due to security reasons
        </Typography>
      </FlexContainer>
      <Button as={Link} to={PATH.PROFILE} type={'button'}>
        Back to profile
      </Button>
    </Card>
  )
}
