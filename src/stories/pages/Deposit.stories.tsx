import type { Meta, StoryObj } from '@storybook/react'

import Page from '@/app/(transactions)/deposit/page'
import { Nav } from '@/components'
import { ActiveTabContextProvider, StatementsContext } from '@/contexts'
import { Transaction } from '@/types'
import { balance, deposits, mockStatements, transfers, withdrawals } from '../assets/mockData'

const meta: Meta<typeof Page> = {
  title: 'Pages/DepositPage',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      // router: {
      //   path: '/deposit',
      // },
      navigation: {
        pathname: '/deposit',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Page>

export const Deposit: Story = {
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
