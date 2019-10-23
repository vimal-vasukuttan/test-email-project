import { AxiosRequestConfig } from 'axios'

export const getConfig: () => AxiosRequestConfig = (): AxiosRequestConfig => {
  return {
    baseURL: 'https://samples.openweathermap.org',
    timeout: 3000
  }
}
