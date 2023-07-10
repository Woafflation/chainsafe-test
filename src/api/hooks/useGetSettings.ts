import type { GetSettingsResponse } from '../types.ts'

import { useEffect, useMemo, useState } from 'react'
import { getSettings } from '../index.ts'
import { transformCountriesResponse, transformLanguagesResponse } from '../utils.ts'
import { UseGetSettingsResponse } from '../types.ts'

export const useGetSettings = (): UseGetSettingsResponse => {
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState<GetSettingsResponse>({
    countries: [],
    languages: [],
  })

  const countries = useMemo(() => transformCountriesResponse(settings.countries), [settings])
  const languages = useMemo(() => transformLanguagesResponse(settings.languages), [settings])

  useEffect(() => {
    setLoading(true)

    getSettings()
      .then((res) => {
        setSettings(res)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { loading, countries, languages }
}
