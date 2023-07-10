import type { Meta, StoryObj } from '@storybook/react'

import Content from './Content.tsx'

const meta = {
  title: 'Holiday/Layout/Content',
  component: Content,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Content>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    showSidebar: false,
  },
}
