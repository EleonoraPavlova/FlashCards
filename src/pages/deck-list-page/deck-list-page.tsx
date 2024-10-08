import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { DeckDialogForm } from '@/components/forms'
import {
  DeckListTable,
  DeckListTableMobile,
  TableFilterBar,
} from '@/components/ui/layout-components'
import { Button, Pagination, Typography } from '@/components/ui/primitives'
import { useGetDecksQuery, useGetMinMaxQuery, useMeQuery } from '@/services'
import { SCREEN_SIZE } from '@/shared/enums'
import { useCurrentScreenWidth, useSearchParamUpdater } from '@/shared/hooks'
import { FlexContainer } from '@/shared/ui/flex-container'
import { Page } from '@/shared/ui/page'

export const DeckListPage = () => {
  const [showAddDeckDialog, setShowAddDeckDialog] = useState(false)
  const [searchParams] = useSearchParams()
  const [skip, setSkip] = useState(true)

  const currentPage = Number(searchParams.get('currentPage') ?? 1)
  const itemsPerPage = Number(searchParams.get('itemsPerPage') ?? 10)
  const min = Number(searchParams.get('min'))
  const max = Number(searchParams.get('max'))
  const search = searchParams.get('search') ?? ''
  const orderBy = searchParams.get('orderBy') ?? ''
  const tab = searchParams.get('tab') ?? 'allDecks'

  const { data: user } = useMeQuery()
  const authorId = tab === 'myDecks' ? user?.id : undefined
  const favoritedBy = tab === 'favorites' ? user?.id : undefined

  const { data: minMax, isFetching: isFetchingMin } = useGetMinMaxQuery()

  const updateSearchParam = useSearchParamUpdater()

  useEffect(() => {
    if (minMax) {
      updateSearchParam({ max: minMax?.max, min: minMax.min })
      setSkip(false)
    }
    // 'updateSearchParam' mustn't be added to avoid cyclical dependence
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minMax])

  const { data: decks, isFetching } = useGetDecksQuery(
    {
      authorId,
      currentPage,
      favoritedBy,
      itemsPerPage,
      maxCardsCount: max,
      minCardsCount: min,
      name: search || undefined,
      orderBy: orderBy || undefined,
    },
    { skip }
  )

  const currentScreenWidth = useCurrentScreenWidth()
  const breakpoint = SCREEN_SIZE.TABLET_TINY
  const isTinyScreen = currentScreenWidth <= breakpoint

  if (!decks || !user) {
    return <Page />
  }

  return (
    <Page load={isFetching}>
      {!isFetchingMin && (
        <FlexContainer fd={'column'} gap={'24px'} pd={'0 20px'}>
          <FlexContainer jc={'space-between'}>
            <Typography as={'h1'} variant={'h1'}>
              {"Deck's list"}
            </Typography>
            <Button onClick={setShowAddDeckDialog}>Add New Deck</Button>
          </FlexContainer>
          <TableFilterBar max={minMax?.max} min={minMax?.min} search={search} />
          {isTinyScreen ? (
            <DeckListTableMobile decks={decks.items} user={user} />
          ) : (
            <DeckListTable decks={decks.items} user={user} />
          )}
          {decks.items.length ? (
            <Pagination
              currentPage={currentPage}
              pageSize={itemsPerPage}
              totalCount={decks.pagination.totalItems}
            />
          ) : (
            <Typography variant={'subtitle2'}>No decks</Typography>
          )}
          <DeckDialogForm onOpenChange={setShowAddDeckDialog} open={showAddDeckDialog} />
        </FlexContainer>
      )}
    </Page>
  )
}
