import type { FC } from 'react'
import type { ButtonProps } from './types.ts'

import s from './Button.module.css'

const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button className={s.button} {...rest}>
      {children}
    </button>
  )
}

export default Button
