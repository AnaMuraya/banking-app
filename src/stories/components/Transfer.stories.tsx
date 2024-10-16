import type { Meta, StoryObj } from '@storybook/react'

import { Transfer } from '@/components'
import { StatementsContext } from '@/contexts'
import { Transaction } from '@/types'
import { balance, deposits, mockStatements, transfers, withdrawals } from '../assets/mockData'

const meta: Meta<typeof Transfer> = {
  title: 'Components/Transfer',
  component: Transfer,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Transfer>

export const TransferTab: Story = {
  decorators: [
    Story => (
      <StatementsContext.Provider
        value={{
          statements: mockStatements as Transaction[],
          updateStatements: () => {},
          balance: { balance, deposits, withdrawals, transfers },
        }}
      >
        <div style={{ margin: '30px' }}>
          <Story />
        </div>
      </StatementsContext.Provider>
    ),
  ],
}
