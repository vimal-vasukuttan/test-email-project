import { KoaServer } from "./server/server";

const server: KoaServer = new KoaServer()
server.setUp()
server.start()
