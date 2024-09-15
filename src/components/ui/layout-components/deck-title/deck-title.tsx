import { useState } from 'react'

import dummyCover from '@/assets/webp/dummy-cover.webp'
import { DeckDialogForm, DeleteDialogForm } from '@/components/forms'
import { SettingsDropdown } from '@/components/ui/layout-components'
import { Image, Typography } from '@/components/ui/primitives'
import { CardsListResponse } from '@/services'
import { GetDeckResponse } from '@/services/decks/deck.types'
import { DIALOG_ACTION, RATIO } from '@/shared/enums'
import { FlexContainer } from '@/shared/ui/flex-container'

import { cn } from './deck-title.styles'

type DeckTitleProps = {
  cardsData: CardsListResponse | undefined
  deck: GetDeckResponse
  isAuthor: boolean
  learnDeckPath: string
}

export const DeckTitle = ({ cardsData, deck, isAuthor, learnDeckPath }: DeckTitleProps) => {
  const [showUpdateDeckDialogForm, setShowUpdateDeckDialogForm] = useState(false)
  const [showDeleteDeckDialogForm, setShowDeleteDeckDialogForm] = useState(false)

  const { cover, id, name } = deck

  const editHandler = () => {
    setShowUpdateDeckDialogForm(true)
  }

  const deleteHandler = () => {
    setShowDeleteDeckDialogForm(true)
  }

  const cardsCount = cardsData?.items.length !== 0

  return (
    <div className={cn.container}>
      <FlexContainer gap={'8px'}>
        <Typography as={'h1'} variant={'h1'}>
          {name}
        </Typography>
        {cardsCount && (
          <SettingsDropdown
            isAuthor={isAuthor}
            learnDeckPath={learnDeckPath}
            onDelete={deleteHandler}
            onEdit={editHandler}
          />
        )}
      </FlexContainer>
      <Image alt={'Deck cover image'} ratio={RATIO.M} src={cover ?? dummyCover} variant={'m'} />
      {showUpdateDeckDialogForm && (
        <DeckDialogForm
          action={DIALOG_ACTION.UPDATE}
          deck={deck}
          onOpenChange={setShowUpdateDeckDialogForm}
          open={showUpdateDeckDialogForm}
        />
      )}
      <DeleteDialogForm
        entityId={id}
        name={name}
        onOpenChange={setShowDeleteDeckDialogForm}
        open={showDeleteDeckDialogForm}
      />
    </div>
  )
}
