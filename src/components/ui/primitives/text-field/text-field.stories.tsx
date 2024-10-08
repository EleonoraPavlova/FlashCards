import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { TextField } from '@/components/ui/primitives/text-field'
import { store } from '@/services'

const withProviders = (StoryComponent: any) => (
  <MemoryRouter>
    <Provider store={store}>
      <StoryComponent />
    </Provider>
  </MemoryRouter>
)

const meta = {
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    helperText: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    variant: {
      control: {
        options: ['text', 'password', 'search'],
        type: 'radio',
      },
    },
  },
  component: TextField,
  decorators: [withProviders],
  tags: ['autodocs'],
  title: 'Primitives/TextField',
} satisfies Meta<typeof TextField>

type Story = StoryObj<typeof meta>
export default meta

export const Text: Story = {
  args: {
    label: 'Label',
    placeholder: 'Enter text...',
    variant: 'text',
  },
}

export const Password: Story = {
  args: {
    label: 'Label',
    placeholder: 'Enter password...',
    variant: 'password',
  },
}

export const Search: Story = {
  args: {
    placeholder: 'Search',
    variant: 'search',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled',
  },
}

export const Error: Story = {
  args: {
    error: true,
    helperText: 'Error',
    placeholder: 'Enter text...',
  },
}
