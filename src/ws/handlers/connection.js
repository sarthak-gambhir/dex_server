import { textMessageHandler } from "./message.js";

const webSocketConnectionHandler = (ws) => {
  ws.on("message", textMessageHandler(ws));
};

export default webSocketConnectionHandler;
