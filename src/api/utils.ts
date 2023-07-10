import { Country, GetSupportedCountriesResponse, GetSupportedLanguagesResponse, Language } from './types.ts'

export const transformCountriesResponse = (countries: Country[]): GetSupportedCountriesResponse => {
  return countries.reduce((countriesMap, country) => {
    const { isoCode, name } = country
    countriesMap[isoCode] = name[0].text
    return countriesMap
  }, {} as GetSupportedCountriesResponse)
}

export const transformLanguagesResponse = (languages: Language[]): GetSupportedLanguagesResponse => {
  return languages.reduce((languagesMap, language) => {
    const { isoCode, name } = language
    languagesMap[isoCode] = name
    return languagesMap
  }, {} as GetSupportedLanguagesResponse)
}
