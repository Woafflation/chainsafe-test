import type { Country, GetSettingsResponse, GetHolidaysParams, Language, Holiday } from './types.ts'

import axios from 'axios'
import instance from './instance.ts'

const getSupportedCountries = () => instance.get<Country[]>('Countries')
const getSupportedLanguages = () => instance.get<Language[]>('Languages')
export const getPublicHolidays = (params: GetHolidaysParams) =>
  instance.get<Holiday[]>('PublicHolidays', {
    params,
  })
export const getCountryCode = ({ latitude, longitude }: { latitude: number; longitude: number }) =>
  axios.get<{ data: { country_code: string }[] }>(
    'http://api.positionstack.com/v1/reverse?access_key=deea70f14e18dec7a8da4eae885f00fd',
    {
      params: {
        query: `${latitude},${longitude}`,
      },
    },
  )

export const getSettings = async (): Promise<GetSettingsResponse> => {
  const [{ data: countries }, { data: languages }] = await Promise.all([
    getSupportedCountries(),
    getSupportedLanguages(),
  ])

  return { countries, languages }
}
