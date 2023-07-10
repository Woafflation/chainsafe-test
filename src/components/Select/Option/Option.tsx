import type { FC, MouseEventHandler } from 'react'
import type { OptionProps, Option } from './types.ts'

import { useEffect, useRef } from 'react'
import s from './Option.module.css'

const OptionEl: FC<OptionProps> = (props) => {
  const {
    option: { value, title },
    onClick,
  } = props
  const optionRef = useRef<HTMLButtonElement>(null)

  const handleClick =
    (clickedValue: Option['value']): MouseEventHandler<HTMLButtonElement> =>
    () => {
      onClick(clickedValue)
    }

  useEffect(() => {
    const option = optionRef.current
    if (!option) return
    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (document.activeElement === option && event.key === 'Enter') {
        onClick(value)
      }
    }

    option.addEventListener('keydown', handleEnterKeyDown)
    return () => {
      option.removeEventListener('keydown', handleEnterKeyDown)
    }
  }, [value, onClick])

  return (
    <button
      className={s.option}
      value={value}
      onClick={handleClick(value)}
      tabIndex={0}
      data-testid={`select-option-${value}`}
      ref={optionRef}
    >
      {title}
    </button>
  )
}

export default OptionEl
