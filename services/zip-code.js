import axios from 'axios'

const apiClient = axios.create({
  baseURL: `https://api.zippopotam.us`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getPlace(countryCode, postalCode) {
    return apiClient.get(`${countryCode}/${postalCode}`)
  },
}
