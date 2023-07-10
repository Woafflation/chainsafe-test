import type { Option } from './Option/types.ts'

export type SelectProps = {
  selected: Option | null
  options: Option[]
  placeholder?: string
  mode?: 'rows' | 'cells'
  status?: 'default' | 'invalid'
  onChange?: (selected: Option['value']) => void
  onClose?: () => void
}
