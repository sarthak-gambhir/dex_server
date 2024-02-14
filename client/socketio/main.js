const messageForm = document.getElementById("message-form");
const messageFormSubmitButton = document.getElementById(
  "message-form-submit-button"
);
const messageInput = document.getElementById("message-input");

const connectionURLInput = document.getElementById("connection-url-input");
const connStatusValueSpan = document.getElementById("connection-status-value");
const connectWebSocketButton = document.getElementById(
  "connect-websocket-button"
);

const messageList = document.getElementById("message-list");

let socket = null;

const messageHandler = ({ id, message }) => {
  let li = document.createElement("li");
  let userIdSpan = document.createElement("span");
  let messageSpan = document.createElement("span");
  li.classList.add("message");

  messageSpan.innerText = message;
  messageSpan.classList.add("message-content");
  userIdSpan.innerText = `User<${id}>:`;
  userIdSpan.classList.add("message-sender");
  li.appendChild(userIdSpan);
  li.appendChild(messageSpan);

  messageList.appendChild(li);
  console.log(message);
};

const connectWebSocket = () => {
  let connectionUrl = connectionURLInput.value;

  if (connectionUrl.length) {
    socket = new io("ws://" + connectionUrl);
    socket.on("connect", updateConnStatus);
    socket.on("disconnect", updateConnStatus);
    socket.on("message", messageHandler);
  } else {
    alert(
      "Please enter connection url first.\nThe format is <HOST>:<PORT>.\n\n" +
        "Example: localhost:5000"
    );
  }
};

const disconnectWebSocket = () => {
  socket.close();
};

const updateConnStatus = () => {
  let connStatus = socket?.connected;

  if (connStatus) {
    connStatusValueSpan.innerText = "Connected";
    connStatusValueSpan.classList = "status-connected";
    connectWebSocketButton.innerText = "Disconnect";
    connectWebSocketButton.onclick = disconnectWebSocket;
    messageInput.disabled = false;
    messageFormSubmitButton.disabled = false;
    connectionURLInput.disabled = true;
  } else {
    connStatusValueSpan.innerText = "Disconnected";
    connStatusValueSpan.classList = "status-disconnected";
    connectWebSocketButton.innerText = "Connect";
    connectWebSocketButton.onclick = connectWebSocket;
    messageInput.disabled = true;
    messageFormSubmitButton.disabled = true;
    connectionURLInput.disabled = false;
  }
};

messageInput.addEventListener("keydown", (e) => {
  e.key === "enter" && messageForm.onsubmit();
});

updateConnStatus();

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  message = messageInput.value;
  if (String(message).trim().length > 0) {
    socket.emit("message", message);

    messageInput.value = "";
  }

  messageInput.focus();
});
