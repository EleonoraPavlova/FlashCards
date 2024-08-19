import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Image, Td } from '@/components/ui/primitives'
import { RATIO, SCREEN_SIZE } from '@/shared/enums'
import { useCurrentScreenWidth } from '@/shared/hooks'
import { FlexContainer } from '@/shared/ui/flex-container'

type Props = {
  content?: string
  entity?: string
  image?: string
  jc?: CSSProperties['justifyContent']
} & ComponentPropsWithoutRef<typeof Td>

type PositionCellRef = ElementRef<typeof Td>

export const PositionCell = forwardRef<PositionCellRef, Props>(
  ({ children, content, entity, image, jc, ...props }, ref) => {
    const currentScreenWidth = useCurrentScreenWidth()
    const breakpoint = SCREEN_SIZE.TABLET
    const isTabletScreen = currentScreenWidth <= breakpoint

    return (
      <Td {...props} ref={ref}>
        <FlexContainer fw={isTabletScreen ? 'wrap' : 'nowrap'} gap={'10px'} jc={jc}>
          {image && <Image alt={`${entity}'s image`} ratio={RATIO.S} src={image} variant={'s'} />}
          {content} {children}
        </FlexContainer>
      </Td>
    )
  }
)
