import type { Meta, StoryObj } from '@storybook/react'

import { Radio as RadioComponent } from '@/components/ui/primitives'
import { mockRadio3 } from '@/components/ui/primitives/radio/radio.mock'

const meta = {
  argTypes: {
    disabled: { control: 'boolean' },
  },
  component: RadioComponent,
  tags: ['autodocs'],
  title: 'Primitives/Radio',
} satisfies Meta<typeof RadioComponent>

type Story = StoryObj<typeof meta>
export default meta

export const Radio: Story = {
  args: {
    options: mockRadio3,
  },
}
