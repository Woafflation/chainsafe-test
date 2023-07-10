import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://openholidaysapi.org/',
})

export default instance
