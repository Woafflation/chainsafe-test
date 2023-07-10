import type { Dispatch } from 'react'
import type { SettingsAction, SettingsState } from '../../reducers/types.ts'

export type SettingsProps = {
  settingsState: SettingsState
  dispatchSettingsAction: Dispatch<SettingsAction>
}
