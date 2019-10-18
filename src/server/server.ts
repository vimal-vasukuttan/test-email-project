import * as Koa from "koa";
import * as KoaRouter from "koa-router";
import { Server } from "http";

export class KoaServer {
  private readonly app: Koa = new Koa();
  private server: Server;
  private readonly port: number = 3000;

  public setUp(): void {
    this.app.use(this.getRoutes());
  }

  public start(): void {
    this.server = this.app.listen(this.port);
    console.log("Server is running...");
  }

  public stop(): void {
    this.server.close();
  }

  public getRoutes(): Koa.Middleware {
    let router: KoaRouter = new KoaRouter();
    router.get("/health", async ctx => {
      ctx.body = "ok";
    });
    return router.routes();
  }
}
