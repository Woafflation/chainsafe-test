import type { FC } from 'react'
import type { SidebarProps } from './types.ts'

import cx from 'classnames'
import Settings from '../Settings/Settings.tsx'
import s from './Sidebar.module.css'

const Sidebar: FC<SidebarProps> = ({ showSidebar, dispatchSettingsAction, settingsState }) => {
  return (
    <>
      <aside className={cx(s.sidebar, showSidebar && s.visible)}>
        Settings
        <Settings settingsState={settingsState} dispatchSettingsAction={dispatchSettingsAction} />
      </aside>
      <div className={cx(s.blocker, showSidebar && s.visible)}></div>
    </>
  )
}

export default Sidebar
