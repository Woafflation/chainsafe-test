import type { FC, MouseEventHandler } from 'react'
import type { SelectProps } from './types.ts'
import type { Option } from './Option/types.ts'

import { useEffect, useRef, useState } from 'react'
import { InlineIcon } from '@iconify/react'
import OptionEl from './Option/Option.tsx'
import s from '../Select/Select.module.css'

const Select: FC<SelectProps> = (props) => {
  const { mode = 'rows', options, placeholder, status = 'default', selected, onChange, onClose } = props
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const placeholderRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        isOpen && onClose?.()
        setIsOpen(false)
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [onClose])

  useEffect(() => {
    const placeholderEl = placeholderRef.current
    if (!placeholderEl) return

    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setIsOpen((prev) => !prev)
      }
    }
    placeholderEl.addEventListener('keydown', handleEnterKeyDown)

    return () => {
      placeholderEl.removeEventListener('keydown', handleEnterKeyDown)
    }
  }, [])

  const handleOptionClick = (value: Option['value']) => {
    setIsOpen(false)
    onChange?.(value)
  }
  const handlePlaceHolderClick: MouseEventHandler<HTMLButtonElement> = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className={s.selectWrapper} ref={rootRef} data-is-active={isOpen} data-mode={mode} data-testid="selectWrapper">
      <div className={s.arrow}>
        <InlineIcon className={s.sidebar_icon} icon="octicon:chevron-down-12" />
      </div>
      <button
        className={s.placeholder}
        data-status={status}
        data-selected={!!selected?.value}
        onClick={handlePlaceHolderClick}
        tabIndex={0}
        ref={placeholderRef}
      >
        {selected?.title || placeholder}
      </button>
      {isOpen && (
        <div className={s.select} data-testid="selectDropdown">
          {options.map((option) => (
            <OptionEl key={option.value} option={option} onClick={handleOptionClick} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Select
