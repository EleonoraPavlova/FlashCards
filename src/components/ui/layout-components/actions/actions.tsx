import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/primitives'
import { ACTIONS, VARIANT } from '@/shared/enums'
import { useActionButtons } from '@/shared/hooks/use-actions-buttons'
import { FlexContainer } from '@/shared/ui/flex-container'

import { PositionCell } from '../tables/container-components'
import { cn } from './actions.styles'

type ActionsProps = {
  id: string
  isEmptyDeck?: boolean
  isFavorite?: boolean
  isMobile?: boolean
  onDelete: () => void
  onEdit: () => void
  onLearn?: string
  variant?: VARIANT
} & ComponentPropsWithoutRef<typeof FlexContainer>

export const Actions = ({
  id,
  isEmptyDeck = false,
  isFavorite,
  isMobile = false,
  onDelete,
  onEdit,
  onLearn,
  variant = VARIANT.ALL,
  ...restFlexContainer
}: ActionsProps) => {
  const { filteredActionButtons } = useActionButtons({
    id,
    isFavorite,
    isMobile,
    onDelete,
    onEdit,
    onLearn,
    variant,
  })

  return isMobile ? (
    <PositionCell>
      <FlexContainer fw={'wrap'} gap={'10px'}>
        {filteredActionButtons.map(el => {
          if (isEmptyDeck && el.label === ACTIONS.LEARN) {
            return null
          }

          return (
            <Button
              as={el.path ? Link : 'button'}
              className={cn.buttonMobile}
              fullWidth
              key={el.label}
              onClick={el.handler}
              title={el.title}
              to={el.path}
              variant={'link'}
            >
              {el.icon}
            </Button>
          )
        })}
      </FlexContainer>
    </PositionCell>
  ) : (
    <FlexContainer gap={'10px'} {...restFlexContainer}>
      {filteredActionButtons.map(el => {
        if (isEmptyDeck && el.label === ACTIONS.LEARN) {
          return null
        }

        return (
          <Button
            as={el.path ? Link : 'button'}
            className={cn.button}
            key={el.label}
            onClick={el.handler}
            title={el.title}
            to={el.path}
            variant={'link'}
          >
            {el.icon}
          </Button>
        )
      })}
    </FlexContainer>
  )
}

// import { ComponentPropsWithoutRef } from 'react'
// import { Link } from 'react-router-dom'

// import { EditOutline, Heart, HeartOutline, PlayCircleOutline, TrashOutline } from '@/assets/icons'
// import { Button, Td } from '@/components/ui/primitives'
// import { useAddDeckToFavoriteMutation, useRemoveDeckFromFavoriteMutation } from '@/services'
// import { ACTIONS, VARIANT } from '@/shared/enums'
// import { ActionButton } from '@/shared/types/common'
// import { FlexContainer } from '@/shared/ui/flex-container'
// import { getActionButtons } from '@/shared/utils'

// import { PositionCell } from '../tables/container-components'
// import { cn } from './actions.styles'

// type ActionsProps = {
//   id: string
//   isFavorite?: boolean
//   isMobile?: boolean
//   onDelete: () => void
//   onEdit: () => void
//   onLearn?: string
//   variant?: VARIANT
// } & ComponentPropsWithoutRef<typeof FlexContainer>

// export const Actions = ({
//   id,
//   isFavorite,
//   isMobile = false,
//   onDelete,
//   onEdit,
//   onLearn,
//   variant = VARIANT.ALL,
//   ...restFlexContainer
// }: ActionsProps) => {
//   const [addDeckToFavorite] = useAddDeckToFavoriteMutation()
//   const [removeDeckFromFavorite] = useRemoveDeckFromFavoriteMutation()

//   const favoriteHandler = () => {
//     if (isFavorite) {
//       removeDeckFromFavorite({ id })
//     } else {
//       addDeckToFavorite({ id })
//     }
//   }

//   const actionButtons: ActionButton[] = [
//     {
//       icon: <PlayCircleOutline className={isMobile ? cn.mobile : cn.action} />,
//       label: ACTIONS.LEARN,
//       path: onLearn,
//       title: 'Learn deck',
//     },
//     {
//       handler: onEdit,
//       icon: <EditOutline className={isMobile ? cn.mobile : cn.action} />,
//       label: ACTIONS.EDIT,
//       title: 'Edit deck',
//     },
//     {
//       handler: onDelete,
//       icon: <TrashOutline className={isMobile ? cn.mobile : cn.action} />,
//       label: ACTIONS.DELETE,
//       title: 'Delete deck',
//     },
//     {
//       handler: favoriteHandler,
//       icon: isFavorite ? (
//         <Heart className={isMobile ? cn.favoriteMobile : cn.favorite} />
//       ) : (
//         <HeartOutline className={isMobile ? cn.favoriteMobile : cn.favorite} />
//       ),
//       label: ACTIONS.FAVORITE,
//       title: 'Add deck to favorite',
//     },
//   ]

//   return (
//     <Td className={cn.tdActions}>
//       {getActionButtons(actionButtons, variant).map(el => (
//         <div key={el.label} className={cn.td}>
//           <Button
//             as={el.path ? Link : 'button'}
//             className={isMobile ? cn.buttonMobile : cn.button}
//             fullWidth={isMobile}
//             onClick={el.handler}
//             title={el.title}
//             to={el.path}
//             variant={'link'}
//           >
//             {el.icon}
//           </Button>
//         </div>
//       ))}
//     </Td>
//   )
// }
