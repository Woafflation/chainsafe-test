import type { Holiday } from '../api/types.ts'

export type SettingsState = {
  country: string
  language: string
  year: string
  month: string
}

export type SettingsAction = {
  type: string
  payload: string
}

export type HolidaysState = {
  holidays?: Holiday[]
  loading?: boolean
}

export type HolidaysAction = {
  type: string
  holidays?: Holiday[]
  loading?: boolean
}
