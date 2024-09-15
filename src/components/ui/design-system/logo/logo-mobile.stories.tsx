import type { Meta, StoryObj } from '@storybook/react'

import { Logo as LogoComponent } from './logo'

const meta = {
  argTypes: {},
  component: LogoComponent,
  title: 'Design System/Logo For Mobile',
} satisfies Meta<typeof LogoComponent>

type Story = StoryObj<typeof meta>
export default meta

export const LogoForMobile: Story = {
  args: {
    isMobile: true,
  },
}
