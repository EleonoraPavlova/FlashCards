import { LogoOutline } from '@/assets/icons'
import { Typography } from '@/components/ui/primitives'
import { FlexContainer } from '@/shared/ui/flex-container'

import s from './logo.module.scss'

type LogoProps = {
  isMobile?: boolean
}

export const Logo = ({ isMobile }: LogoProps) => {
  const cn = s.typography

  return isMobile ? (
    <LogoOutline />
  ) : (
    <FlexContainer>
      <LogoOutline />
      <Typography className={cn} variant={'h2'}>
        Quizlet Cards
      </Typography>
    </FlexContainer>
  )
}
