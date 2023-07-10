import type { HolidaysState, HolidaysAction } from './types.ts'
import type { Holiday } from '../api/types.ts'

const SET_HOLIDAYS = 'SET_HOLIDAYS'
const SET_LOADING = 'SET_LOADING'

export function holidaysReducer(state: HolidaysState, action: HolidaysAction) {
  switch (action.type) {
    case SET_HOLIDAYS:
      return { ...state, holidays: action.holidays }
    case SET_LOADING:
      return { ...state, loading: action.loading }
    default:
      return state
  }
}

export const setHolidaysAC = (holidays: Holiday[]): HolidaysAction => ({ type: SET_HOLIDAYS, holidays })
export const setLoadingAC = (loading: boolean): HolidaysAction => ({ type: SET_LOADING, loading })
