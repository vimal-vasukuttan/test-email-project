import Axios, { AxiosInstance, AxiosResponse } from 'axios'

import { ClimateResponse } from '../models/climateResponseInterface'
import { getConfig } from '../utils/helpers'

/**
 * To process climate
 */
export class ClimateService {
  public axios: AxiosInstance = Axios.create(getConfig())
  /**
   * Get climate details
   */
  public getClimate(location: string): Promise<ClimateResponse> {
    const url: string = `https://samples.openweathermap.org/data/2.5/weather?q=${location}&appid=b6907d289e10d714a6e88b30761fae22`
    try {
      return this.axios.get<ClimateResponse>(url).then((response: AxiosResponse): ClimateResponse => response.data)
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e.message)
    }
  }
}
