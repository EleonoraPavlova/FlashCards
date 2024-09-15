import type { Meta, StoryObj } from '@storybook/react'

import { Button, Card, Typography } from '@/components/ui/primitives'
import { FlexContainer } from '@/shared/ui/flex-container'

const meta = {
  argTypes: {
    as: {
      control: { type: 'radio' },
      options: ['div', 'article', 'section', 'aside'],
    },
  },
  component: Card,
  tags: ['autodocs'],
  title: 'Primitives/Card',
} satisfies Meta<typeof Card>

type Story = StoryObj<typeof meta>
export default meta

export const CardSample: Story = {
  args: {
    style: {
      height: '288px',
      width: '420px',
    },
  },
}

export const CardWithQuestion = () => {
  return (
    <Card style={{ width: '420px' }}>
      <FlexContainer fd={'column'} gap={'14px'}>
        <Typography as={'h1'} variant={'h1'}>
          Learn &quot;Deck Name&quot;
        </Typography>
        <Typography variant={'subtitle1'}>
          Question: How &quot;This&quot; works in JavaScript?
        </Typography>
        <Typography style={{ marginBottom: '10px' }}>
          Number of attempts to answer the question: 10
        </Typography>
        <Button fullWidth>Show Answer</Button>
      </FlexContainer>
    </Card>
  )
}
