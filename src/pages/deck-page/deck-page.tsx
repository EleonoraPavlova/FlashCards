import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/components/svgIcons'
import myImage from '@/assets/webp/react-logo.webp'
import { AddNewCardDialogForm, AddNewDeckDialogForm, DeleteDialogForm } from '@/components/forms'
import { Button } from '@/components/ui/button'
import { DeckTable } from '@/components/ui/deck-table'
import { CardListExample } from '@/components/ui/deck-table/deck-table.mock'
import { DeckTitle } from '@/components/ui/deck-title/deck-title'
import { Pagination } from '@/components/ui/pagination'
import { TextField } from '@/components/ui/text-field'
import { FlexContainer } from '@/shared/ui/flex-container'
import { Page } from '@/shared/ui/page'
import clsx from 'clsx'

import s from './deck-page.module.scss'

export const DeckPage = () => {
  const [editModeWithId, setEditModeWithId] = useState<null | string>(null)
  const [showAddNewDeckDialogForm, setShowAddNewDeckDialogForm] = useState<boolean>(false)
  const [showDeleteDialogForm, setShowDeleteDialogForm] = useState<boolean>(false)
  const cn = {
    goBack: clsx(s.goBack),
    icon: clsx(s.icon),
    image: clsx(s.image),
    learnDeck: clsx(s.learnDeck),
    pagination: clsx(s.pagination),
  }

  // todo: delete mock data from components props during relevant Routing or RTKQuery task.
  return (
    <Page>
      <FlexContainer fd={'column'} gap={'24px'} jc={'space-between'}>
        <Button as={Link} className={cn.goBack} to={'/deck-list'} variant={'link'}>
          <ArrowBackOutline className={cn.icon} />
          Back to Decks List
        </Button>
        <FlexContainer ai={'start'} jc={'start'}>
          <DeckTitle
            image={myImage}
            isDeleteOpen={showDeleteDialogForm}
            isEditOpen={showAddNewDeckDialogForm}
            onOpenChangeDelete={setShowDeleteDialogForm}
            onOpenChangeEdit={setShowAddNewDeckDialogForm}
            title={"Fried's Deck"}
          />
          <Button as={Link} className={cn.learnDeck} to={'/card'}>
            Learn Deck
          </Button>
        </FlexContainer>
        <TextField placeholder={'find card'} variant={'search'} />
        <DeckTable
          cardList={CardListExample}
          editClick={setEditModeWithId}
          onSort={() => console.log('onSort invoked!')}
        />

        <Pagination
          className={cn.pagination}
          currentPage={1}
          onPageChange={() => {}}
          totalCount={100}
        />

        <AddNewCardDialogForm
          onOpenChange={() => setEditModeWithId(null)}
          onSubmit={() => console.log('onSubmit')}
          open={!!editModeWithId}
        />

        <AddNewDeckDialogForm
          onOpenChange={setShowAddNewDeckDialogForm}
          onSubmit={() => console.log('onSubmit')}
          open={showAddNewDeckDialogForm}
        />

        <DeleteDialogForm
          entity={'Card'}
          id={'15'}
          name={'Some name'}
          onOpenChange={setShowDeleteDialogForm}
          onSubmit={() => console.log('onSubmit')}
          open={showDeleteDialogForm}
        />
      </FlexContainer>
    </Page>
  )
}
