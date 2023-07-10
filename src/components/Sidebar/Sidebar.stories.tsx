import type { Meta, StoryObj } from '@storybook/react'

import Sidebar from './Sidebar.tsx'

const meta = {
  title: 'Holiday/Layout/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    showSidebar: true,
  },
}
