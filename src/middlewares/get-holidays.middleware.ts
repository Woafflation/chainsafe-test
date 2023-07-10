import type { Dispatch } from 'react'
import type { HolidaysAction, SettingsAction, SettingsState } from '../reducers/types.ts'
import type { GetHolidaysParams } from '../api/types.ts'

import dayjs from 'dayjs'
import { getPublicHolidays } from '../api'
import { SET_COUNTRY, SET_LANGUAGE, SET_MONTH, SET_YEAR } from '../reducers/settings.reducer.ts'
import { setHolidaysAC, setLoadingAC } from '../reducers/holidays.reducer.ts'

export const getHolidaysMiddleware =
  (dispatch: Dispatch<HolidaysAction>) =>
  (state: SettingsState) =>
  () =>
  (next: (action: SettingsAction) => void) =>
  (action: SettingsAction) => {
    next(action)

    const lastDayOfMonth = dayjs(`${state.year}-${state.month}-01`).daysInMonth()

    const params: GetHolidaysParams = {
      countryIsoCode: state.country,
      languageIsoCode: state.language,
      validFrom: `${state.year}-${state.month}-01`,
      validTo: `${state.year}-${state.month}-${lastDayOfMonth}`,
    }

    switch (action.type) {
      case SET_COUNTRY:
        params.countryIsoCode = action.payload
        params.languageIsoCode = 'EN'
        break
      case SET_LANGUAGE:
        params.languageIsoCode = action.payload
        break
      case SET_YEAR: {
        const year = action.payload
        const lastDay = dayjs(`${year}-${state.month}-01`).daysInMonth()

        params.validFrom = `${year}-${state.month}-01`
        params.validTo = `${year}-${state.month}-${lastDay}`
        break
      }
      case SET_MONTH: {
        const month = action.payload
        const lastDay = dayjs(`${state.year}-${month}-01`).daysInMonth()

        params.validFrom = `${state.year}-${month}-01`
        params.validTo = `${state.year}-${month}-${lastDay}`
        break
      }
      default:
        return state
    }

    dispatch(setLoadingAC(true))
    getPublicHolidays(params)
      .then((res) => dispatch(setHolidaysAC(res.data)))
      .finally(() => dispatch(setLoadingAC(false)))
  }
