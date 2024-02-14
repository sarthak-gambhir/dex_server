import { textMessageHandler } from "./message.js";

const socketioConnectionHandler = (io) => (socket) => {
  console.log(`Client connected with id: ${socket.id}`);
  socket.on("message", textMessageHandler(io, socket));
};

export default socketioConnectionHandler;
