import type { FC } from 'react'
import type { HeaderProps } from './types.ts'

import { InlineIcon } from '@iconify/react'
import Button from '../Button/Button.tsx'
import s from './Header.module.css'

const Header: FC<HeaderProps> = ({ handleShowSidebar, showSidebar }) => {
  return (
    <header className={s.header}>
      <Button onClick={handleShowSidebar}>
        {showSidebar ? (
          <InlineIcon className={s.sidebar_icon} icon="octicon:sidebar-expand-24" />
        ) : (
          <InlineIcon className={s.sidebar_icon} icon="octicon:sidebar-collapse-24" />
        )}
      </Button>
    </header>
  )
}

export default Header
