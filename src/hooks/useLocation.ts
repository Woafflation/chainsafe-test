import { useEffect } from 'react'
import { useGeolocated } from 'react-geolocated'
import { getCountryCode } from '../api'

export const useLocation = (action: (countryCode: string) => void) => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated()

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      getCountryCode({ latitude: coords.latitude, longitude: coords.longitude }).then((res) => {
        const location = res.data?.data.find((el) => el.country_code)
        const countryCode = location?.country_code
        if (countryCode) {
          action(countryCode)
        }
      })
    }
  }, [coords, isGeolocationAvailable, isGeolocationEnabled])
}
