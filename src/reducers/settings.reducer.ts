import { SettingsAction, SettingsState } from './types.ts'

export const SET_COUNTRY = 'SET_COUNTRY'
export const SET_LANGUAGE = 'SET_LANGUAGE'
export const SET_YEAR = 'SET_YEAR'
export const SET_MONTH = 'SET_MONTH'

export function settingsReducer(state: SettingsState, action: SettingsAction) {
  switch (action.type) {
    case SET_COUNTRY:
      return { ...state, country: action.payload, language: 'EN' }
    case SET_LANGUAGE:
      return { ...state, language: action.payload }
    case SET_YEAR:
      return { ...state, year: action.payload, month: '01' }
    case SET_MONTH:
      return { ...state, month: action.payload }
    default:
      return state
  }
}

export const setCountryAC = (country: string): SettingsAction => ({ type: SET_COUNTRY, payload: country })
export const setLanguageAC = (language: string): SettingsAction => ({ type: SET_LANGUAGE, payload: language })
export const setYearAC = (year: string): SettingsAction => ({ type: SET_YEAR, payload: year })
export const setMonthAC = (month: string): SettingsAction => ({ type: SET_MONTH, payload: month })
