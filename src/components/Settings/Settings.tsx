import type { FC } from 'react'
import type { Option } from '../Select/Option/types.ts'
import type { SettingsProps } from './types.ts'

import { useCallback, useMemo } from 'react'
import { setCountryAC, setLanguageAC, setMonthAC, setYearAC } from '../../reducers/settings.reducer.ts'
import { useGetSettings } from '../../api/hooks/useGetSettings.ts'
import { useLocation } from '../../hooks/useLocation.ts'
import Select from '../Select/Select.tsx'
import s from './Settings.module.css'

const yearOptions: Option[] = [
  { title: '2023', value: '2023' },
  { title: '2022', value: '2022' },
  { title: '2021', value: '2021' },
  { title: '2020', value: '2020' },
]

const monthOptions: Option[] = [
  { title: 'Jan', value: '01' },
  { title: 'Feb', value: '02' },
  { title: 'Mar', value: '03' },
  { title: 'Apr', value: '04' },
  { title: 'May', value: '05' },
  { title: 'Jun', value: '06' },
  { title: 'Jul', value: '07' },
  { title: 'Aug', value: '08' },
  { title: 'Sep', value: '09' },
  { title: 'Oct', value: '10' },
  { title: 'Nob', value: '11' },
  { title: 'Dec', value: '12' },
]

const Settings: FC<SettingsProps> = ({ dispatchSettingsAction, settingsState }) => {
  const { loading, languages, countries } = useGetSettings()
  const { country, language, year, month } = settingsState

  const countriesData = useMemo(
    () =>
      Object.keys(countries).reduce((acc, curr) => {
        return [...acc, { title: countries[curr], value: curr }]
      }, [] as Option[]),
    [countries],
  )

  const languagesData = useMemo((): Option[] => {
    if (!languages[country]) return [{ title: `${countries[country]} (EN)`, value: 'EN' }]
    return languages[country].map((el) => ({ title: `${el.text} (${el.language})`, value: el.language }))
  }, [countries, country, languages])

  const handleSelectCountry = useCallback(
    (val: string) => {
      if (countries[val]) dispatchSettingsAction(setCountryAC(val))
    },
    [countries, dispatchSettingsAction],
  )

  const handleSelectLanguage = useCallback(
    (val: string) => {
      dispatchSettingsAction(setLanguageAC(val))
    },
    [dispatchSettingsAction],
  )

  const handleSelectYear = useCallback(
    (val: string) => {
      dispatchSettingsAction(setYearAC(val))
    },
    [dispatchSettingsAction],
  )

  const handleSelectMonth = useCallback(
    (val: string) => {
      dispatchSettingsAction(setMonthAC(val))
    },
    [dispatchSettingsAction],
  )

  useLocation(handleSelectCountry)

  const selectedCountry = countriesData.find((item) => item.value === country)
  const selectedLanguage = languagesData.find((item) => item.value === language)
  const selectedYear = yearOptions.find((item) => item.value === year)
  const selectedMonth = monthOptions.find((item) => item.value === month)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <section className={s.settings}>
      <div>
        <Select
          placeholder="Select country"
          mode="cells"
          options={countriesData}
          selected={selectedCountry || null}
          onChange={handleSelectCountry}
        />
        <span className={s.description}>* Select supported country</span>
      </div>
      <div>
        <Select
          placeholder="Select language"
          mode="cells"
          options={languagesData}
          selected={selectedLanguage || null}
          onChange={handleSelectLanguage}
        />
        <span className={s.description}>* Select supported language</span>
      </div>
      <div>
        <Select
          placeholder="Select year"
          mode="cells"
          options={yearOptions}
          selected={selectedYear || null}
          onChange={handleSelectYear}
        />
        <span className={s.description}>* Select supported year</span>
      </div>
      <div>
        <Select
          placeholder="Select month"
          mode="cells"
          options={monthOptions}
          selected={selectedMonth || null}
          onChange={handleSelectMonth}
        />
        <span className={s.description}>* Select month</span>
      </div>
    </section>
  )
}

export default Settings
