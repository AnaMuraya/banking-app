import type { Meta, StoryObj } from '@storybook/react'

import { ErrorTemplate } from '@/components'

const meta: Meta<typeof ErrorTemplate> = {
  title: 'Pages/ErrorTemplate',
  component: ErrorTemplate,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ErrorTemplate>

export const Error: Story = {}
