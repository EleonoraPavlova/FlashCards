import type { Meta, StoryObj } from '@storybook/react'

import { MemoryRouter } from 'react-router-dom'

import { mockTabs1, mockTabs3 } from '@/components/ui/primitives/tab-switcher/tab-switcher.mock'
import { action } from '@storybook/addon-actions'

import { TabSwitcher as TabSwitcherComponent } from './tab-switcher'

const meta = {
  argTypes: {},
  component: TabSwitcherComponent,
  tags: ['autodocs'],
  title: 'Primitives Components/TabSwitcher',
} satisfies Meta<typeof TabSwitcherComponent>

export default meta
type Story = StoryObj<typeof meta>

export const TabSwitcher: Story = {
  args: {
    defaultValue: 'tab-value-2',
    label: 'Tab Switcher Label',
    onTabChange: action('Mock action invoked'),
    tabs: mockTabs1,
  },
  render: args => {
    return (
      <MemoryRouter>
        <TabSwitcherComponent {...args} />
      </MemoryRouter>
    )
  },
}

export const TabSwitcherDisabled: Story = {
  args: {
    onTabChange: action('Mock action invoked'),
    tabs: mockTabs3,
  },
  render: args => {
    return (
      <MemoryRouter>
        <TabSwitcherComponent {...args} />
      </MemoryRouter>
    )
  },
}
