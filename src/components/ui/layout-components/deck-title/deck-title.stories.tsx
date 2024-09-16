import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { DeckTitle as DeckTitleComponent } from '@/components/ui/layout-components'
import { CardListExample } from '@/components/ui/layout-components/tables/deck-table/deck-table.mock'
import { store } from '@/services'
import { GetDeckResponse } from '@/services/decks'

const meta = {
  argTypes: {},
  component: DeckTitleComponent,
  title: 'Layout Components',
} satisfies Meta<typeof DeckTitleComponent>

type Story = StoryObj<typeof meta>
export default meta

export const DeckTitle: Story = {
  args: {
    cardsData: {
      items: CardListExample,
      pagination: {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 3,
        totalPages: 1,
      },
    },
    deck: { name: "Friend's Deck" } as GetDeckResponse,
    isAuthor: false,
    learnDeckPath: '',
  },
  render: args => {
    return (
      <MemoryRouter>
        <Provider store={store}>
          <div style={{ width: 'fit-content' }}>
            <DeckTitleComponent {...args} />
          </div>
        </Provider>
      </MemoryRouter>
    )
  },
}
