import type { Meta, StoryObj } from '@storybook/react'

import Select from './Select.tsx'

const meta = {
  title: 'Holiday/Components/Select',
  component: Select,
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      { title: 'Jan', value: '01' },
      { title: 'Feb', value: '02' },
    ],
    selected: null,
  },
}
