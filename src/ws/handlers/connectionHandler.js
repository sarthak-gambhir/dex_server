import { textMessageHandler } from "./messageHandlers.js";

const webSocketConnectionHandler = (ws) => {
  ws.on("message", textMessageHandler(ws));
};

export default webSocketConnectionHandler;
