import { ChangeEvent, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/icons'
import { CardDialogForm, DeckDialogForm, DeleteDialogForm } from '@/components/forms'
import { DeckTitle } from '@/components/ui/layout-components'
import { DeckTable } from '@/components/ui/layout-components/tables'
import { Button, Progress, TextField } from '@/components/ui/primitives'
import { Pagination } from '@/components/ui/primitives/pagination'
import { cn } from '@/pages/deck-page/deck-page.styles'
import { PaginationModel } from '@/services/cards/cards.types'
import { Deck } from '@/services/decks/deck.types'
import { useGetCardsQuery, useGetDeckQuery } from '@/services/flashcards-api'
import { DIALOG_ACTION, DIALOG_ENTITY, PATH } from '@/shared/enums'
import { FlexContainer } from '@/shared/ui/flex-container'
import { Page } from '@/shared/ui/page'

import { EmptyDeck } from './empty-deck'

export const DeckPage = () => {
  const [showCreateNewCardDialogForm, setShowCreateNewCardDialogForm] = useState(false)
  const [showUpdateCardDialogForm, setShowUpdateCardDialogForm] = useState(false)
  const [showDeleteCardDialogForm, setShowDeleteCardDialogForm] = useState(false)
  const [showAddNewDeckDialogForm, setShowAddNewDeckDialogForm] = useState(false)
  const [showDeleteDeckDialogForm, setShowDeleteDeckDialogForm] = useState(false)

  const { deckId } = useParams()
  const [search, setSearch] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: deck = {} as Deck,
    error: deckError,
    isLoading: isLoadingDeck,
  } = useGetDeckQuery({ id: deckId ?? '' })

  const {
    data: cardsData,
    error: cardsError,
    isLoading: isLoadingCards,
  } = useGetCardsQuery({
    currentPage,
    deckId: deckId ?? '',
    itemsPerPage,
    question: search || undefined,
  })

  const { items: cards = [], pagination = {} as PaginationModel } = cardsData ?? {}

  // todo: delete console.log with error during err handling task completion
  console.log(cardsError)
  console.log(deckError)
  console.log('deck', deck)

  const editDeckHandler = () => {
    setShowAddNewDeckDialogForm(!showAddNewDeckDialogForm)
  }

  const deleteDeckHandler = () => {
    setShowDeleteDeckDialogForm(!showDeleteDeckDialogForm)
  }

  const createCardHandler = () => {
    setShowCreateNewCardDialogForm(!showCreateNewCardDialogForm)
  }

  const updateCardHandler = () => {
    setShowUpdateCardDialogForm(!showUpdateCardDialogForm)
  }

  const deleteCardHandler = () => {
    setShowDeleteCardDialogForm(!showDeleteCardDialogForm)
  }

  const searchCardHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
  }

  const paginationPageSizeHandler = (pageSize: string) => {
    setCurrentPage(1)
    setItemsPerPage(Number(pageSize))
  }

  const paginationCurrentPageHandler = (currentPage: number) => {
    setCurrentPage(currentPage)
  }

  console.log({ isLoadingCards, isLoadingDeck })

  if (isLoadingCards || isLoadingDeck) {
    return <Progress />
  }

  const isEmpty = cards.length === 0

  // todo: delete mock data from components props during relevant Routing or RTKQuery task.
  return (
    <Page>
      <FlexContainer fd={'column'} gap={'24px'} jc={'space-between'} pd={'0 20px'}>
        <Button as={Link} className={cn.goBack} to={PATH.DECK_LIST} variant={'link'}>
          <ArrowBackOutline className={cn.icon} />
          Back to Decks List
        </Button>

        <FlexContainer ai={'start'} jc={'start'}>
          <DeckTitle
            cover={deck.cover}
            onDelete={deleteDeckHandler}
            onEdit={editDeckHandler}
            title={(deck.name ??= 'Name Deck')}
          />

          {!isEmpty && (
            <FlexContainer fd={'column'} gap={'20px'}>
              <Button as={Link} className={cn.cardControl} to={PATH.CARD_LEARN}>
                Learn Deck
              </Button>
              {/* todo: add check if current Deck Author is me then show Button*/}
              <Button className={cn.cardControl} onClick={createCardHandler}>
                Add New Card
              </Button>
            </FlexContainer>
          )}
        </FlexContainer>
        {isEmpty && <EmptyDeck createCardHandler={createCardHandler} />}
        {!isEmpty && (
          <TextField
            label={'Find question'}
            onChange={searchCardHandler}
            placeholder={'Find card'}
            value={search}
            variant={'search'}
          />
        )}
        {!isEmpty && (
          <DeckTable
            cards={cards}
            onDelete={deleteCardHandler}
            onEdit={updateCardHandler}
            onSort={() => console.log('onSort invoked!')}
          />
        )}
        {!isEmpty && (
          <Pagination
            className={cn.pagination}
            currentPage={currentPage}
            onPageChange={paginationCurrentPageHandler}
            onPageSizeChange={paginationPageSizeHandler}
            pageSize={itemsPerPage}
            totalCount={pagination.totalItems}
          />
        )}

        {/* todo: change mock deckId later*/}
        <CardDialogForm
          deckId={'cly7c2vqa0drxpb015rp9sbi7'}
          onOpenChange={createCardHandler}
          open={showCreateNewCardDialogForm}
        />
        <CardDialogForm
          action={DIALOG_ACTION.UPDATE}
          deckId={'cly7c2vqa0drxpb015rp9sbi7'}
          onOpenChange={updateCardHandler}
          open={showUpdateCardDialogForm}
        />
        <DeckDialogForm
          onOpenChange={setShowAddNewDeckDialogForm}
          open={showAddNewDeckDialogForm}
        />
        <DeleteDialogForm
          entity={DIALOG_ENTITY.CARD}
          id={'15'}
          name={'Some name'}
          onOpenChange={deleteCardHandler}
          onSubmit={() => console.log('onSubmit')}
          open={showDeleteCardDialogForm}
        />
        <DeleteDialogForm
          id={'15'}
          name={'Some name'}
          onOpenChange={deleteDeckHandler}
          onSubmit={() => console.log('onSubmit')}
          open={showDeleteDeckDialogForm}
        />
      </FlexContainer>
    </Page>
  )
}
