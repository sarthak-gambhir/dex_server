export const textMessageHandler = (io, socket) => (message) => {
  console.log({ id: socket.id, message });
  io.emit("message", { id: socket.id, message });
};
