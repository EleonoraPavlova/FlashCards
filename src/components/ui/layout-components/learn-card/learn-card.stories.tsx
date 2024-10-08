import { LearnCard as LearnCardComponent } from '@/components/ui/layout-components'
import { learnCardData } from '@/components/ui/layout-components/learn-card/learn-card.mock'
import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: LearnCardComponent,
  title: 'Layout Components',
} satisfies Meta<typeof LearnCardComponent>

type Story = StoryObj<typeof meta>
export default meta

export const LearnCard: Story = {
  args: {
    card: learnCardData,
    deckName: 'Deck Name',
    onNextQuestion: action('onNextQuestion action invoked!'),
    onShowAnswer: action('onShowAnswer action invoked!'),
    showAnswer: true,
  },
}
