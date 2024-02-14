import getWebSocketServer from "./src/ws/index.js";

const wss = getWebSocketServer({ port: 5000, host: "0.0.0.0" });
