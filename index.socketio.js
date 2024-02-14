import getSocketIOHttpServer from "./src/socketio/index.js";

const socketIOHttpServer = getSocketIOHttpServer({
  cors: {
    origin:
      process.env.NODE_ENV === "production" ? false : "http://localhost:8080",
  },
});

socketIOHttpServer.listen(5000);
