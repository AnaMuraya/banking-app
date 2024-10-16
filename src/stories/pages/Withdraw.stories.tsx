import type { Meta, StoryObj } from '@storybook/react'

import Page from '@/app/(transactions)/withdraw/page'
import { Nav } from '@/components'
import { ActiveTabContextProvider, StatementsContext } from '@/contexts'
import { Transaction } from '@/types'
import { balance, deposits, mockStatements, transfers, withdrawals } from '../assets/mockData'

const meta: Meta<typeof Page> = {
  title: 'Pages/WithdrawPage',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/withdraw',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Page>

export const Withdraw: Story = {
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
