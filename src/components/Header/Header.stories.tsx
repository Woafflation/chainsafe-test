import type { Meta, StoryObj } from '@storybook/react'

import Header from './Header.tsx'

const meta = {
  title: 'Holiday/Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    showSidebar: false,
  },
}
