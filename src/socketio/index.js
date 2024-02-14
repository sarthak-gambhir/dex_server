import { createServer } from "http";
import { Server } from "socket.io";
import socketioConnectionHandler from "./handlers/connection.js";

const getSocketIOHttpServer = (serverConfig = {}) => {
  const httpServer = createServer();

  const io = new Server(httpServer, serverConfig);

  io.on("connection", socketioConnectionHandler(io));

  return httpServer;
};

export default getSocketIOHttpServer;
