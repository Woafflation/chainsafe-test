export type HolidayType = 'Public' | 'Bank' | 'School' | 'BackToSchool' | 'EndOfLessons'

export type LocalizedText = {
  language: string
  text: string
}

export type Subdivision = {
  code: string
  shortName: string
}

export interface Country {
  isoCode: string
  name: LocalizedText[]
  officialLanguages: string[]
}

export interface Holiday {
  id: string
  name: LocalizedText[]
  type: HolidayType
  nationwide: boolean
  subdivisions?: Subdivision[]
  startDate: Date
  endDate: Date
}

export interface Language {
  isoCode: string
  name: LocalizedText[]
}

export type GetSettingsResponse = {
  countries: Country[]
  languages: Language[]
}

export type GetHolidaysParams = {
  countryIsoCode: string
  languageIsoCode: string
  validFrom: string
  validTo: string
}

export type GetSupportedCountriesResponse = Record<string, string>

export type GetSupportedLanguagesResponse = Record<string, LocalizedText[]>

export type UseGetSettingsResponse = {
  loading: boolean
  countries: GetSupportedCountriesResponse
  languages: GetSupportedLanguagesResponse
}
