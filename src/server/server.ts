import { Server } from 'http'
import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'

import { climateHandler } from '../middleware/climateRequestHandler'
import { requestLogHandler } from '../middleware/requestLogHandler'
/**
 * Class to instantiate Koa server
 */
export class KoaServer {
  private readonly app: Koa = new Koa()
  private server: Server
  private readonly port: number = 3000

  /**
   * Set up the application
   */
  public setUp(): void {
    this.app.use(requestLogHandler())
    this.app.use(this.getRoutes())
  }

  /**
   * start the server
   */
  public start(): void {
    this.server = this.app.listen(this.port)
    // tslint:disable-next-line:no-console
    console.log('Server is running...')
  }

  /**
   * Stop the server
   */
  public stop(): void {
    this.server.close()
  }
  /**
   * Set all routes to the application
   */
  public getRoutes(): Koa.Middleware {
    const router: KoaRouter = new KoaRouter()
    router.get('/health', async ctx => {
      ctx.body = 'ok'
    })

    router.get('/location/:location', climateHandler())

    return router.routes()
  }
}
