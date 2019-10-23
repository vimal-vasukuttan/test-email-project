import { Context, Middleware } from 'koa'

/**
 * Handler for logging each request to the application and error handler
 */

const requestLogHandler: () => Middleware = (): Middleware => {
  return async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    try {
      console.log('Current request:', ctx.URL)
      await next()
    } catch (err) {
      console.log('Error occurred while logging')
    }
  }
}

export { requestLogHandler }
