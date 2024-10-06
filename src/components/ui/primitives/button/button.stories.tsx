import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'

import { ArrowBackOutline, Heart } from '@/assets/icons'
import { Button } from '@/components/ui/primitives'
import { store } from '@/services'
import { FlexContainer } from '@/shared/ui/flex-container'
import { action } from '@storybook/addon-actions'

const meta = {
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['button', 'a'],
    },
    href: { control: 'text' },
    target: { control: 'text' },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'link', 'icon', 'danger'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Primitives/Button',
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof meta>
export default meta

export const Buttons: Story = {
  render: () => (
    <Provider store={store}>
      <FlexContainer gap={'14px'}>
        <Button onClick={action('Primary Button Clicked')} variant={'primary'}>
          Primary
        </Button>
        <Button onClick={action('Secondary Button Clicked')} variant={'secondary'}>
          Secondary
        </Button>
        <Button onClick={action('Danger Button Clicked')} variant={'danger'}>
          Danger
        </Button>
        <Button onClick={action('WithIcon Button Clicked')} variant={'primary'}>
          <Heart style={{ marginRight: '8px' }} />
          Button with Icon
        </Button>
        <Button onClick={action('IconButton Clicked')} variant={'icon'}>
          <Heart />
        </Button>
        <Button
          as={'a'}
          href={'https://google.com'}
          onClick={action('BackButton Clicked')}
          target={'_blank'}
          variant={'link'}
        >
          <ArrowBackOutline style={{ marginRight: '8px' }} />
          Go Back
        </Button>
        <Button
          as={'a'}
          href={'https://google.com'}
          onClick={action('AsLink Clicked')}
          target={'_blank'}
          variant={'link'}
        >
          Button as Link
        </Button>
      </FlexContainer>
    </Provider>
  ),
}
