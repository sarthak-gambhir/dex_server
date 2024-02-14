import { WebSocket, WebSocketServer } from "ws";
import webSocketConnectionHandler from "./handlers/connectionHandler.js";

const getWebSocketServer = (serverConfig = {}) => {
  const wss = new WebSocketServer(serverConfig);

  wss.on("connection", webSocketConnectionHandler);

  return wss;
};

export default getWebSocketServer;
