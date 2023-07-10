import type { Dispatch } from 'react'
import type { SettingsAction, SettingsState } from '../../reducers/types.ts'

export type SidebarProps = {
  showSidebar: boolean
  settingsState: SettingsState
  dispatchSettingsAction: Dispatch<SettingsAction>
}
