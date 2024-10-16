import type { Meta, StoryObj } from '@storybook/react'

import Home from '@/app/page'
import { Nav } from '@/components'
import { ActiveTabContextProvider, StatementsContext } from '@/contexts'
import { Transaction } from '@/types'
import { balance, deposits, mockStatements, transfers, withdrawals } from '../assets/mockData'

const meta: Meta<typeof Home> = {
  title: 'Pages/StatementsPage',
  component: Home,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Home>

export const Statements: Story = {
  decorators: [
    Story => (
      <StatementsContext.Provider
        value={{
          statements: mockStatements as Transaction[],
          updateStatements: () => {},
          balance: { balance, deposits, withdrawals, transfers },
        }}
      >
        <ActiveTabContextProvider>
          <Nav />
          <main className="main">
            <Story />
          </main>
        </ActiveTabContextProvider>
      </StatementsContext.Provider>
    ),
  ],
}
