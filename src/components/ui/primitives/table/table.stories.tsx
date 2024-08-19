import type { Meta, StoryObj } from '@storybook/react'

import { Tbody, Td, Table as TableComponent, Thead, Th, Tr } from '@/components/ui/primitives/table'

const mockTableData = [
  {
    cards: '33',
    createdBy: 'Alice Johnson',
    id: '1',
    lastUpdated: '01.01.2023',
    name: 'How tired I am of layout and CSS',
  },
  {
    cards: '41',
    createdBy: 'Bob Smith',
    id: '2',
    lastUpdated: '15.07.2022',
    name: 'JavaScript for dummies',
  },
  {
    cards: '52',
    createdBy: 'Diana Prince',
    id: '3',
    lastUpdated: '30.03.2021',
    name: 'Oh yes, these bugs again',
  },
  {
    cards: '27',
    createdBy: 'Charlie Brown',
    id: '4',
    lastUpdated: '10.12.2020',
    name: 'When you’re full-stack and sleep for 2 hours',
  },
]

const meta = {
  argTypes: {},
  component: TableComponent,
  tags: ['autodocs'],
  title: 'Primitives/Table',
} satisfies Meta<typeof TableComponent>

type Story = StoryObj<typeof meta>
export default meta

const mockData = () => {
  return mockTableData.map(el => (
    <Tr key={el.id}>
      <Td>{el.name}</Td>
      <Td>{el.cards}</Td>
      <Td>{el.createdBy}</Td>
      <Td>{el.lastUpdated}</Td>
    </Tr>
  ))
}

export const Table: Story = {
  render: () => {
    return (
      <TableComponent>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Cards</Th>
            <Th>Last Updated</Th>
            <Th>Created by</Th>
          </Tr>
        </Thead>
        <Tbody>{mockData()}</Tbody>
      </TableComponent>
    )
  },
}
