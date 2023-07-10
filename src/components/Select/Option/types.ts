export type Option = {
  title: string
  value: string
}

export type OptionProps = {
  option: Option
  onClick: (value: Option['value']) => void
}
