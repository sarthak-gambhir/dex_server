export const textMessageHandler = (ws) => (data) => {
  const message = Buffer.from(data).toString();
  console.log({
    message,
  });

  ws.send(message);
};
