import type { Meta, StoryObj } from '@storybook/react'

import { LoadingTemplate } from '@/components'

const meta: Meta<typeof LoadingTemplate> = {
  title: 'Pages/LoadingTemplate',
  component: LoadingTemplate,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LoadingTemplate>

export const Loading: Story = {}
