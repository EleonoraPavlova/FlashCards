import { ChangeEvent } from 'react'

import { TrashOutline } from '@/assets/icons'
import { Button, Slider, TabSwitcher, TextField } from '@/components/ui/primitives'
import { useSearchParamUpdater } from '@/shared/hooks'
import { Tab } from '@/shared/types/common'
import { FlexContainer } from '@/shared/ui/flex-container'

import { cn } from './table-filter-bar.styles'

type TableFilterBarProps = {
  max: number
  min: number
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSliderChange: (sliderRange: number[]) => void
  onTabChange: (tab: string) => void
  search: string
}
export const TableFilterBar = ({
  max,
  min,
  onSearchChange,
  onSliderChange,
  onTabChange,
  search,
}: TableFilterBarProps) => {
  const updateSearchParam = useSearchParamUpdater()

  const tabs: Tab[] = [
    { title: 'All Decks', value: 'allDecks' },
    { title: 'My Decks', value: 'myDecks' },
    { title: 'Favorites', value: 'favorites' },
  ]

  const clearFiltersHandler = () => {
    updateSearchParam({
      authorId: '',
      currentPage: 1,
      itemsPerPage: 10,
      max: 100,
      min: 0,
      orderBy: '',
      search: '',
      tab: 'allDecks',
    })
  }

  return (
    <FlexContainer ai={'flex-end'} fd={'row'} gap={'24px'}>
      <TextField
        onChange={onSearchChange}
        placeholder={'Search decks'}
        value={search}
        variant={'search'}
      />
      <TabSwitcher
        className={cn.tabs}
        label={'Show decks cards'}
        onTabChange={onTabChange}
        tabs={tabs}
      />
      <Slider label={'Number of cards'} max={max} min={min} onRangeChange={onSliderChange} />
      <Button className={cn.button} onClick={clearFiltersHandler} variant={'secondary'}>
        <TrashOutline />
        Clear Filter
      </Button>
    </FlexContainer>
  )
}
