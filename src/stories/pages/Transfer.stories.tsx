import type { Meta, StoryObj } from '@storybook/react'

import Page from '@/app/(transactions)/transfer/page'
import { Nav } from '@/components'
import { ActiveTabContextProvider, StatementsContext } from '@/contexts'
import { Transaction } from '@/types'
import { balance, deposits, mockStatements, transfers, withdrawals } from '../assets/mockData'

const meta: Meta<typeof Page> = {
  title: 'Pages/TransferPage',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/transfer',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Page>

export const Transfer: Story = {
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
