import type { Meta, StoryObj } from '@storybook/react'

import { Statements } from '@/components'
import { StatementsContext } from '@/contexts'
import { Transaction } from '@/types'
import { balance, deposits, mockStatements, transfers, withdrawals } from '../assets/mockData'

const meta: Meta<typeof Statements> = {
  title: 'Components/Statements',
  component: Statements,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Statements>

export const StatementsTab: Story = {
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
  args: {
    title: 'Account Statements',
  },
}
