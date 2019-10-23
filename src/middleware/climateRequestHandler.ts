import { Middleware } from 'koa'
import { IRouterContext } from 'koa-router'

import { ClimateService } from '../services/climateServices'

/**
 * Handle request to get climate of a region
 */
export const climateHandler: () => Middleware = (): Middleware => {
  return async (ctx: IRouterContext, next: () => Promise<void>): Promise<void> => {
    const climateService: ClimateService = new ClimateService()
    ctx.body = await climateService.getClimate(ctx.params.location)

    return next()
  }
}
