import {} from '@storybook/nextjs'
import type { Meta, StoryObj } from '@storybook/react'

import { Nav } from '@/components'
import { ActiveTabContextProvider } from '@/contexts'
import { TransactionTypes } from '@/types'

const meta: Meta<typeof Nav> = {
  title: 'Components/Navbar',
  component: Nav,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    activeTab: {
      control: { type: 'select' },
      options: Object.values(TransactionTypes),
      defaultValue: undefined,
      description: 'The active tab of the navbar',
      table: {
        type: { summary: 'TransactionTypes' },
        defaultValue: { summary: 'undefined' },
      },
      value: undefined,
    },
  },
}

export default meta
type Story = StoryObj<typeof Nav>

export const UndefinedActiveTab: Story = {
  args: {
    activeTab: undefined,
  },
  decorators: [
    Story => (
      <ActiveTabContextProvider>
        <Story />
      </ActiveTabContextProvider>
    ),
  ],
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
}

export const DepositActiveTab: Story = {
  args: {
    activeTab: TransactionTypes.deposit,
  },
  decorators: [
    Story => (
      <ActiveTabContextProvider>
        <Story />
      </ActiveTabContextProvider>
    ),
  ],
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/deposit',
      },
    },
  },
}

export const WithdrawActiveTab: Story = {
  args: {
    activeTab: TransactionTypes.withdraw,
  },
  decorators: [
    Story => (
      <ActiveTabContextProvider>
        <Story />
      </ActiveTabContextProvider>
    ),
  ],
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/withdraw',
      },
    },
  },
}

export const TransferActiveTab: Story = {
  args: {
    activeTab: TransactionTypes.transfer,
  },
  decorators: [
    Story => (
      <ActiveTabContextProvider>
        <Story />
      </ActiveTabContextProvider>
    ),
  ],
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/transfer',
      },
    },
  },
}
